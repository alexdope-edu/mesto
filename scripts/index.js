
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
const profileFormElement = profilePopup.querySelector('.popup__content');
// Поле имени в форме профиля
const nameInputElement = profilePopup.querySelector('.popup__field_info_name');
// Полу профессии в форме профиля
const jobInputElement = profilePopup.querySelector('.popup__field_info_job');
// Кнопка открытия Popup для редактирования профиля
const profileEditButton = document.querySelector('.profile__edit');
// Кнопка закрытия Popup для редактирования профиля
const profileCloseButton = document.querySelector('.popup__close');

// Функция для закрытия popup профиля
function closeProfilePopup() {
  profilePopup.classList.remove('popup_opened')
}

// Обработчик клика на кнопку открытия Popup для редактирования профиля
profileEditButton.addEventListener('click', () => {
  // Копирую текущее имя и профессию пользователя в соответствующие поля формы
  nameInputElement.value = profileName.innerText;
  jobInputElement.value = profileJob.innerText;
  profilePopup.classList.add('popup_opened');
});

// Обработчик клика на кнопку закрытия Popup для редактирования профиля
profileCloseButton.addEventListener('click', closeProfilePopup);

// Обработчик сохранения формы
profileFormElement.addEventListener('submit', (event) => {
  event.preventDefault();
  
  // Копирую значения из полей формы в подзаголовки с именем и профессией пользователя
  profileName.textContent = nameInputElement.value;
  profileJob.textContent = jobInputElement.value;

  closeProfilePopup()
});

// 
// Предпросмотр картинки карточки
//

// Popup для просмотра
const popupPicture = document.querySelector('#previewPopup');
// Кнопка закрытия Popup
const popupPictureCloseButton = document.querySelector('#popupPictureClose');
// Подзаголовок с именем карточки в Popup
const popupPictureDescription = document.querySelector('#previewDescription');

// Обработчик клика на кнопку закрытия Popup
popupPictureCloseButton.addEventListener('click', () => {
  popupPicture.classList.remove('popup_opened');
});

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
// Кнопка закрытия Popup для добавления карточек
const addCardPopupCloseButton = document.querySelector('#addCardPopupCloseButton');
// Форма для добавления карточек 
const addCardForm = document.querySelector('#addCardForm');
// Поле формы для имени карточки
const addCardInputName = document.querySelector('#addCardInputName');
// Поле формы для ссылки на картитнку
const addCardInputLink = document.querySelector('#addCardInputLink');
// Шаблон карточки
const cardTemplate = document.querySelector('#cardTemplate').content; 

// Функция для закрытия Popup для добавления карточек
function closeAddCardPopup() {
  addCardPopup.classList.remove('popup_opened');
}

// Обработчик клика на кнопку для открытия popup добавления карточек 
addCardButton.addEventListener('click', () => { 
  addCardPopup.classList.add('popup_opened');
});

// Обработчик клика на кнопку для закрытия popup добавления карточек
addCardPopupCloseButton.addEventListener('click', closeAddCardPopup);

// Обработчик сохранения формы добавления карточек
addCardForm.addEventListener('submit', (event) => {
  event.preventDefault();
  addCard(addCardInputName.value, addCardInputLink.value, true);
  closeAddCardPopup();
  addCardInputName.value = '';
  addCardInputLink.value = '';
});

// Добавляет новую карточку на страницу
// Параметр name - строка (имя карточки)
// Параметр link - строка (ссылка на картинку)
// Параметр prepend - bool (добавлять карточку в конец списка или в начало, по умолчанию в конец)
function addCard(name, link, prepend = false) {

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
    // Сохраняю ссылку на img внутри Popup
    const picture = popupPicture.querySelector('#previewImage');
    // Ссылка на кликнутую картинку
    const clickedPicture = event.target;
    // Копирую ссылку из кликнутой картинки в крупную картинку внутри Popup
    picture.src = clickedPicture.src;
    // Копирую alt текст из кликнутой картинки в подзаголовок внутри Popup
    popupPictureDescription.innerText = clickedPicture.alt;
    // Добавляю класс для отображения Popup
    popupPicture.classList.add('popup_opened');
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
    event.target.parentElement.remove();
  });

  //
  // В зависимости от параметра prepend, добавляю новую карточку в начало или конец списка карточек
  //

  if (prepend) {
    cardsContainer.prepend(card);
  } else {
    cardsContainer.append(card);
  }
}

//
// Добавляю изначальные карточки на страницу.
// Перечисляю все карточки из массива и для каждой вызываю функцию addCard
//

for (let i = 0; i < initialCards.length; i++) {
  const card = initialCards[i];
  addCard(card.name, card.link);      
}

