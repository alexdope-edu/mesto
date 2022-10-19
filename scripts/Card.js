import { openPopup } from "./Popup.js";

// Popup для просмотра
const popupPicture = document.querySelector('#previewPopup');
// Картинка внутри Popup предпросмотра
const popupPictureImage = document.querySelector('#previewImage');
// Подзаголовок с именем карточки в Popup
const popupPictureDescription = document.querySelector('#previewDescription');

export class Card {
    constructor(name, link, templateSelector = '#cardTemplate') {
        // Имя картинки
        this._name = name;
        // Ссылка на картинку
        this._link = link;
        // Ссылка на шаблон карточки.
        this._template = document.querySelector(templateSelector).content;
    }

    // Создает новую карточку из шаблона
    // Параметр name - строка (имя карточки)
    // Параметр link - строка (ссылка на картинку)
    getHTMLElement() {
        // Клонирую шаблон карточки
        const card = this._template.cloneNode(true);
        
        //
        // Добавляю класс, alt текст и ссылку (src) к img
        //
    
        const image = card.querySelector('img');
        image.alt = this._name;
        image.src = this._link;
    
        //
        // Назначаю обработчик для клика на картинку.
        // Откроется Popup предпросмотра картинки.
        //
    
        image.addEventListener('click', this._previewHandler);
    
        //
        // Получаю ссылку на подзаголовок для названия картинки
        // Значение параметра name делаю текстом подзаголовка
        //
    
        const h2 = card.querySelector('h2');
        h2.innerText = this._name;
        
        //
        // Обработчик клика на кнопку like
        //
    
        card.querySelector('.elements__button').addEventListener('click', this._toggleLike);
    
        //
        // Добавляю обработчик клика на кнопку удаления карточки 
        //
    
        card.querySelector('.elements__delete').addEventListener('click', this._delete);
    
        // Возвращаю карточку
        return card;
    }

    _previewHandler(event) {
        // Ссылка на кликнутую картинку
        const clickedPicture = event.target;
        // Копирую ссылку и alt text из кликнутой картинки в крупную картинку внутри Popup
        popupPictureImage.src = clickedPicture.src;
        popupPictureImage.alt = clickedPicture.alt;
        // Копирую alt текст из кликнутой картинки в подзаголовок внутри Popup
        popupPictureDescription.innerText = clickedPicture.alt;
        // Открываю Popup
        openPopup(popupPicture);
    }

    _toggleLike(event) {
        const className = 'elements__button_liked';
        const classList = event.target.classList;

        //
        // Если класс elements__button_liked уже есть на кнопке like, то удаляю его (фон сердца станет прозрачным).
        // Но если класса ещё нет, то добавляю его (фон сердца становится чёрным)
        //

        if (classList.contains(className)) {
            classList.remove(className);
        } else {
            classList.add(className);
        }
    }

    _delete(event) {
        // Удаляю элемент, который является родителем кликнутой кнопки.
        // В данном случае родитель - контейнер карточки.
        event.target.closest('.elements__element').remove();
    }
}