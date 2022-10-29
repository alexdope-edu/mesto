import { openPopup } from "./popup.js";

// Popup для просмотра
const popupPicture = document.querySelector('#previewPopup');
// Картинка внутри Popup предпросмотра
const popupPictureImage = document.querySelector('#previewImage');
// Подзаголовок с именем карточки в Popup
const popupPictureDescription = document.querySelector('#previewDescription');

export class Card {
    constructor(name, link, templateSelector) {
        // Имя картинки
        this._name = name;
        // Ссылка на картинку
        this._link = link;
        // Карточка.
        this._card = document.querySelector(templateSelector).content.
            querySelector('.elements__element').
            cloneNode(true);
        // Кнопка like.
        this._buttonLike = this._card.querySelector('.elements__button'); 
        // Кнопка delete.
        this._buttonDelete = this._card.querySelector('.elements__delete'); 
    }

    // Создает новую карточку из шаблона
    // Параметр name - строка (имя карточки)
    // Параметр link - строка (ссылка на картинку)
    getHTMLElement() {

        //
        // Добавляю класс, alt текст и ссылку (src) к img
        //
    
        const image = this._card.querySelector('.elements__photo');
        image.alt = this._name;
        image.src = this._link;
    
        //
        // Назначаю обработчик для клика на картинку.
        // Откроется Popup предпросмотра картинки.
        //
    
        image.addEventListener('click', () => {
            this._previewHandler();
        });
    
        //
        // Получаю ссылку на подзаголовок для названия картинки
        // Значение параметра name делаю текстом подзаголовка
        //
    
        const h2 = this._card.querySelector('.elements__title');
        h2.textContent = this._name;
        
        //
        // Обработчик клика на кнопку like
        //
    
        this._buttonLike.addEventListener('click', () => {
            this._toggleLike();
        });
    
        //
        // Добавляю обработчик клика на кнопку удаления карточки 
        //
    
        this._buttonDelete.addEventListener('click', () => {
            this._delete();
        });
    
        // Возвращаю карточку
        return this._card;
    }

    _previewHandler() {
        popupPictureImage.src = this._link;
        popupPictureImage.alt = this._name;
        popupPictureDescription.textContent = this._name;
        openPopup(popupPicture);
    }

    _toggleLike() {
        this._buttonLike.classList.toggle('elements__button_liked'); 
    }

    _delete() {
        this._card.remove();
        this._card = null;
    }
}