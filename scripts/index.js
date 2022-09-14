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
// Предпросмотр картинки карточки
//

// Popup для просмотра
const popupPicture = document.querySelector('#previewPopup');
// Подзаголовок с именем карточки в Popup
const popupPictureDescription = document.querySelector('#previewDescription');
// Картинка внутри Popup предпросмотра
const popupPictureImage = document.querySelector('#previewImage');

//
// Карточки
//

// Изначальный список карточек (массив)
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
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
// Шаблон карточки
const cardTemplate = document.querySelector('#cardTemplate').content; 

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
  cardsContainer.prepend(createCard(addCardInputName.value, addCardInputLink.value));
  closePopup(addCardPopup);
});

// Создает новую карточку из шаблона
// Параметр name - строка (имя карточки)
// Параметр link - строка (ссылка на картинку)
function createCard(name, link) {
  // Клонирую шаблон карточки
  const card = cardTemplate.querySelector('.elements__element').cloneNode(true);
  
  //
  // Добавляю класс, alt текст и ссылку (src) к img
  //

  const image = card.querySelector('img');
  image.alt = name;
  image.src = link;

  //
  // Назначаю обработчик для клика на картинку.
  // Откроется Popup предпросмотра картинки.
  //

  image.addEventListener('click', (event) => {
    // Ссылка на кликнутую картинку
    const clickedPicture = event.target;
    // Копирую ссылку и alt text из кликнутой картинки в крупную картинку внутри Popup
    popupPictureImage.src = clickedPicture.src;
    popupPictureImage.alt = clickedPicture.alt;
    // Копирую alt текст из кликнутой картинки в подзаголовок внутри Popup
    popupPictureDescription.innerText = clickedPicture.alt;
    // Открываю Popup
    openPopup(popupPicture);
  });

  //
  // Получаю ссылку на подзаголовок для названия картинки
  // Значение параметра name делаю текстом подзаголовка
  //

  const h2 = card.querySelector('h2');
  h2.innerText = name;
  
  //
  // Обработчик клика на кнопку like
  //

  card.querySelector('.elements__button').addEventListener('click', (event) => {
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
      
  });

  //
  // Добавляю обработчик клика на кнопку удаления карточки 
  //

  card.querySelector('.elements__delete').addEventListener('click', (event) => {
    // Удаляю элемент, который является родителем кликнутой кнопки.
    // В данном случае родитель - контейнер карточки.
    event.target.closest('.elements__element').remove();
  });

  // Возвращаю карточку
  return card;
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

// Открывает Popup.
function openPopup(popup) {
  document.addEventListener('keyup', closePopupOnEscape);
  popup.addEventListener('click', closePopupOnOverlayClick);
  popup.classList.add("popup_opened");
}

// Закрывает Popup.
function closePopup(popup) {
  document.removeEventListener('keyup', closePopupOnEscape);
  popup.removeEventListener('click', closePopupOnOverlayClick);
  popup.classList.remove("popup_opened");
}

// Включаю валидацию форм.
enableValidation({
  formSelector: '.validation-target',
  fieldSelector: '.popup__field',
  fieldErrorClass: 'popup__field_error',
  errorContainerSelector: '.popup__input-error',
  errorContainerIndividualClassSuffix: '-error',
  submitButtonSelector: 'button[type=submit]',
  disabledSubmitButtonClass: 'popup__submit_error',
});

//
// Добавляю изначальные карточки на страницу.
//

for (let i = 0; i < initialCards.length; i++) {
  const arrayElement = initialCards[i];
  cardsContainer.append(createCard(arrayElement.name, arrayElement.link));
}
