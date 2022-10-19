//
// Импорты
//

import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';
import { openPopup, closePopup } from './Popup.js';

//
// Профиль
//

// Заголовок с именем пользователя
const profileName = document.querySelector('.profile__title');
// Подзаголовок с профессией пользователя
const profileJob = document.querySelector('.profile__subtitle');  
// Popup профиля
const profilePopup = document.querySelector('#profilePopup');
// Форма профиля
const profileFormElement = profilePopup.querySelector('#profileForm');
// Поле имени в форме профиля
const nameInputElement = profilePopup.querySelector('#profileNameInput');
// Поле профессии в форме профиля
const jobInputElement = profilePopup.querySelector('#profileJobInput');
// Кнопка открытия Popup для редактирования профиля
const profileEditButton = document.querySelector('.profile__edit');

// Присваевает значение полю.
// Также выстреливает событием input, чтобы вызвать соответствующий обработчик (как будто значение было введено в браузере).
function setFieldValue(field, value) {
    field.value = value;
    field.dispatchEvent(new Event('input'));
}

// Обработчик клика на кнопку открытия Popup для редактирования профиля
profileEditButton.addEventListener('click', () => {
  // Принудительно сбрасываю форму.
  profileFormElement.reset();
  // Копирую текущее имя и профессию пользователя в соответствующие поля формы профиля.
  setFieldValue(nameInputElement, profileName.innerText);
  setFieldValue(jobInputElement, profileJob.innerText);
  // Открываю popup.
  openPopup(profilePopup);
});

// Обработчик сохранения формы
profileFormElement.addEventListener('submit', (event) => {
  event.preventDefault();
  
  // Копирую значения из полей формы в подзаголовки с именем и профессией пользователя
  profileName.textContent = nameInputElement.value;
  profileJob.textContent = jobInputElement.value;

  closePopup(profilePopup);
});


//
// Карточки
//

// Изначальный список карточек (массив)
const initialCards = [
  new Card(
    'Архыз', 
    'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
  ),

  new Card(
    'Челябинская область',
    'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
  ),

  new Card(
    'Иваново',
    'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
  ),

  new Card(
    'Камчатка',
    'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
  ),

  new Card(
    'Холмогорский район',
    'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
  ),

  new Card(
    'Байкал',
    'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
  )
];

// Контейнер для карточек
const cardsContainer = document.querySelector('#cards');
// Кнопка открытия Popup для добавления карточек
const addCardButton = document.querySelector('#addCardButton');
// Popup для добавления карточек
const addCardPopup = document.querySelector('#addCardPopup');
// Форма для добавления карточек 
const addCardForm = document.querySelector('#addCardForm');
// Поле формы для имени карточки
const addCardInputName = document.querySelector('#addCardInputName');
// Поле формы для ссылки на картитнку
const addCardInputLink = document.querySelector('#addCardInputLink');

// Обработчик клика на кнопку для открытия popup добавления карточек 
addCardButton.addEventListener('click', () => {
  // Принудительно сбрасываю форму.
  addCardForm.reset();
  // Открываю popup.
  openPopup(addCardPopup);
});

// Обработчик сохранения формы добавления карточек
addCardForm.addEventListener('submit', (event) => {
  event.preventDefault();
  cardsContainer.prepend(new Card(addCardInputName.value, addCardInputLink.value).getHTMLElement());
  closePopup(addCardPopup);
});

// Включаю валидацию форм.
// Сохраняю экземпляры FormValidator в массиве, т.r. не обращаюсь к ним в коде.
const validators = [
  new FormValidator({}, profileFormElement).enableValidation(),
  new FormValidator({}, addCardForm).enableValidation(),
];

//
// Добавляю изначальные карточки на страницу.
//

initialCards.forEach((card) => {
  cardsContainer.append(card.getHTMLElement());
});
