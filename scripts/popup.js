// Открывает Popup.
export function openPopup(popup) {
    document.addEventListener('keyup', closePopupOnEscape);
    popup.addEventListener('click', closePopupOnOverlayClick);
    popup.classList.add("popup_opened");
}

// Закрывает Popup.
export function closePopup(popup) {
    document.removeEventListener('keyup', closePopupOnEscape);
    popup.removeEventListener('click', closePopupOnOverlayClick);
    popup.classList.remove("popup_opened");
}

// Закрывает Popup по нажатию escape.
function closePopupOnEscape(event) {
    if (event.key === 'Escape') {
        closePopup(document.querySelector('.popup_opened'));
    }
}

// Закрывает popup по клику на overlay.
function closePopupOnOverlayClick(event) {
    // Если элемент, на который кликнули - это тот же элемент, на котором висит обработчик, тогда закрываю popup.
    // Также popup закроется, если была кликнута кнопка закрытия.
    if (event.target === event.currentTarget || event.target.classList.contains('popup__close')) {
        closePopup(event.currentTarget);
    }
}
