//
// Импорты
//

import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';
import { openPopup, closePopup } from './popup.js';

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

// Создает карточку.
function createCard(name, link) {
    return new Card(name, link, '#cardTemplate').getHTMLElement();
}

// Обработчик клика на кнопку открытия Popup для редактирования профиля
profileEditButton.addEventListener('click', () => {
  // Принудительно сбрасываю форму.
  profileFormElement.reset();
  // Копирую текущее имя и профессию пользователя в соответствующие поля формы профиля.
  nameInputElement.value, profileName.textContent;
  jobInputElement.value, profileJob.textContent;
  // Сбрасываю ошибки валидации;
  profileFormValidator.resetValidation(); 
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
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
  }
];

// Контейнер для карточек
const cardsContainer = document.querySelector('#cards');
// Кнопка открытия Popup для добавления карточек
const cardAddButton = document.querySelector('#addCardButton');
// Popup для добавления карточек
const cardAddPopup = document.querySelector('#addCardPopup');
// Форма для добавления карточек 
const cardAddForm = document.querySelector('#addCardForm');
// Поле формы для имени карточки
const cardAddInputName = document.querySelector('#addCardInputName');
// Поле формы для ссылки на картитнку
const cardAddInputLink = document.querySelector('#addCardInputLink');

// Обработчик клика на кнопку для открытия popup добавления карточек 
cardAddButton.addEventListener('click', () => {
  // Принудительно сбрасываю форму.
  cardAddForm.reset();
  // Сбрасываю ошибки валидации;
  cardFormValidator.resetValidation(); 
  // Открываю popup.
  openPopup(cardAddPopup);
});

// Обработчик сохранения формы добавления карточек
cardAddForm.addEventListener('submit', (event) => {
  event.preventDefault();
  cardsContainer.prepend(createCard(cardAddInputName.value, cardAddInputLink.value));
  closePopup(cardAddPopup);
});

//
// Включаю валидацию форм.
//

const validationConfig = {
  fieldErrorClass: '.popup__field_error',
  errorContainerIndividualClassSuffix: '-error',
  disabledSubmitButtonClass: 'popup__submit_error',
  fieldSelector: '.popup__field',
  submitButtonSelector: '.popup__submit',
};

const profileFormValidator = new FormValidator(validationConfig, profileFormElement).enableValidation();
const cardFormValidator = new FormValidator(validationConfig, cardAddForm).enableValidation();

//
// Добавляю изначальные карточки на страницу.
//

initialCards.forEach((card) => {
  cardsContainer.append(createCard(card.name, card.link));
});
