// Присваевает значение полю.
// Также выстреливает событием input, чтобы вызвать соответствующий обработчик (как будто значение было введено в браузере).
function setFieldValue(field, value) {
    field.value = value;
    field.dispatchEvent(new Event('input'));
}

// Выставляет состояние поля формы.
function setFieldState(field, fieldErrorClass) {
    // Отображаю или затираю текст ошибки.
    field.customErrorContainer.innerText = field.validationMessage;
    // Если поле не прошло валидацию, добавляю соответствующий класс. Иначе - убираю класс.
    if (!field.validity.valid) {
        field.classList.add(fieldErrorClass);
    } else {
        field.classList.remove(fieldErrorClass);
    }
}

// Очищает ошибки поля.
function clearFieldErrors(field, fieldErrorClass) {
    field.customErrorContainer.innerText = '';
    field.classList.remove(fieldErrorClass);
}

// Выставляет состояние кнопки submit.
function setSubmitButtonState(form, disabledSubmitButtonClass) {
    // Если вся форма валидна - активирую кнопку submit. Иначе - блокирую.
    if (form.pristine || !form.checkValidity()) {
        form.submitButton.disabled = true;
        form.submitButton.classList.add(disabledSubmitButtonClass);
    } else {
        form.submitButton.disabled = false;
        form.submitButton.classList.remove(disabledSubmitButtonClass);
    }
}

// Включаеm валидацию поля формы.
function enableFieldValidation(field, form, config) {
    // Добавляю в объет поля ссылку на соответствующий контейнер для отображения ошибки (чтобы не искать в DOM повторно).
    field.customErrorContainer = form.querySelector(`.${field.id}${config.errorContainerIndividualClassSuffix}`);
    // Добавляю обработчик события input.
    field.addEventListener('input', () => {
        form.pristine = false;
        setFieldState(field, config.fieldErrorClass);
        setSubmitButtonState(form, config.disabledSubmitButtonClass);
    });
}

// Включает валидацию для формы, переданной как параметр.
function enableFormValidation(form, config) {
    // Сохраняю ссылку на кнопку submit в объекте формы (чтобы не искать в DOM повторно).
    form.submitButton = form.querySelector(config.submitButtonSelector);
    // Сохраняю массив полей в объекте формы, чтобы не искать их в DOM повторно.
    const fields = form.querySelectorAll(config.fieldSelector);
    // Включаю валидацию для каждого поля формы.
    fields.forEach(field => enableFieldValidation(field, form, config));

    // Добавляю обработчик события reset.
    form.addEventListener('reset', () => {
        // Помечаю форму как нетронутую пользователем.
        form.pristine = true;
        // Выставляю состояние кнопки submit.
        setSubmitButtonState(form, config.disabledSubmitButtonClass);
        // Очищаю ошибки во всех полях формы.
        fields.forEach(field => {
            clearFieldErrors(field, config.fieldErrorClass);  
        });
    });

    // Принудительно сбрасываю форму.
    form.reset();
}

// Включает валидацию целевых форм.
//
// config.formSelector - селектор целевых форм.
// config.fieldSelector - селектор инпутов внутри форм.
// config.errorContainerSelector - селектор контейнеров для ошибок.
// config.errorContainerIndividualClassSuffix - суффикс индивидуального класса для контейнеров ошибок (span).
// config.fieldErrorClass - класс для инпута в случае ошибочного ввода.
// config.submitButtonSelector - селектор кнопки отправки формы.
// config.disabledSubmitButtonClass - имя класса для стилизации заблокированной кнопки отправки формы.
function enableValidation(config) {
    // Нахожу все формы, подлежащие валидации
    const forms = document.querySelectorAll(config.formSelector);
    // Включаю валидацию для каждой найденной формы.
    forms.forEach(form => enableFormValidation(form, config));
}
