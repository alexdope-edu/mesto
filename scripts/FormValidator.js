export class FormValidator {
    constructor(config, form) {
        this._fieldErrorClass = config.fieldErrorClass || '.popup__field_error';
        this._errorContainerIndividualClassSuffix = config.errorContainerIndividualClassSuffix || '-error';
        this._disabledSubmitButtonClass = config.disabledSubmitButtonClass || 'popup__submit_error';
        this._form = form;
        this._formFields = form.querySelectorAll(config.fieldSelector || '.popup__field');
        this._formSubmitButton = form.querySelector('button[type=submit]');
    }

    // Включает валидацию.
    enableValidation() {
       // Включаю валидацию для каждого поля формы.
       this._formFields.forEach(field => this._enableFieldValidation(field));

       // Добавляю обработчик события reset.
       this._form.addEventListener('reset', () => {
           // Помечаю форму как нетронутую пользователем.
           this._form.pristine = true;
           // Выставляю состояние кнопки submit.
           this._setSubmitButtonState();
           // Очищаю ошибки во всех полях формы.
           this._formFields.forEach(field => {
               this._clearFieldErrors(field);  
           });
       });

       // Принудительно сбрасываю форму.
       this._form.reset();
       return this;
    }

    // Включаеm валидацию поля формы.
    _enableFieldValidation(field) {
        // Добавляю в объет поля ссылку на соответствующий контейнер для отображения ошибки (чтобы не искать в DOM повторно).
        field.customErrorContainer = this._form.querySelector(`.${field.id}${this._errorContainerIndividualClassSuffix}`);
        // Добавляю обработчик события input.
        field.addEventListener('input', () => {
            this._form.pristine = false;
            this._setFieldState(field);
            this._setSubmitButtonState();
        });
    }

    // Выставляет состояние поля формы.
    _setFieldState(field) {
        // Отображаю или затираю текст ошибки.
        field.customErrorContainer.innerText = field.validationMessage;
        // Если поле не прошло валидацию, добавляю соответствующий класс. Иначе - убираю класс.
        if (!field.validity.valid) {
            field.classList.add(this._fieldErrorClass);
        } else {
            field.classList.remove(this._fieldErrorClass);
        }
    }

    // Очищает ошибки поля.
    _clearFieldErrors(field) {
        field.customErrorContainer.innerText = '';
        field.classList.remove(this._fieldErrorClass);
    }

    // Выставляет состояние кнопки submit.
    _setSubmitButtonState() {
        // Если вся форма валидна - активирую кнопку submit. Иначе - блокирую.
        if (this._form.pristine || !this._form.checkValidity()) {
            this._formSubmitButton.disabled = true;
            this._formSubmitButton.classList.add(this._disabledSubmitButtonClass);
        } else {
            this._formSubmitButton.disabled = false;
            this._formSubmitButton.classList.remove(this._disabledSubmitButtonClass);
        }
    }
}
