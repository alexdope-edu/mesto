const cards = [
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


// Profile Popups
const profilePopup = document.querySelector('#profilePopup');
const nameInputElement = profilePopup.querySelector('.popup__field_info_name');
const jobInputElement = profilePopup.querySelector('.popup__field_info_job');
const profileFormElement = profilePopup.querySelector('.popup__content');


// Profile Buttons
const profileEditButton = document.querySelector('.profile__edit');
const profileCloseButton = document.querySelector('.popup__close');


// Profile Selectors
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__subtitle');

profileEditButton.addEventListener('click', openProfilePopup);
profileCloseButton.addEventListener('click', closeProfilePopup);
profileFormElement.addEventListener('submit', formSubmitHandler);

// 
// Popup Picture
//

const popupPicture = document.querySelector('#previewPopup'); 
const popupPictureCloseButton = document.querySelector('#popupPictureClose');
const popupPictureDescription = document.querySelector('#previewDescription');

popupPictureCloseButton.addEventListener('click', () => {
  popupPicture.classList.remove('popup_opened');
});

//
// Cards
//

const cardsContainer = document.querySelector('#cards');
const addCardButton = document.querySelector('#addCardButton');
const addCardPopup = document.querySelector('#addCardPopup');
const addCardPopupCloseButton = document.querySelector('#addCardPopupCloseButton');
const addCardInputName = document.querySelector('#addCardInputName');
const addCardInputLink = document.querySelector('#addCardInputLink');
const addCardForm = document.querySelector('#addCardForm');

function closeAddCardPopup() {
  addCardPopup.classList.remove('popup_opened');
}

addCardButton.addEventListener('click', () => { 
  addCardPopup.classList.add('popup_opened');
});

addCardPopupCloseButton.addEventListener('click', closeAddCardPopup);

addCardForm.addEventListener('submit', (event) => {
  event.preventDefault();
  addCard(addCardInputName.value, addCardInputLink.value, true);
  closeAddCardPopup();
  addCardInputName.value = '';
  addCardInputLink.value = '';
});

function openProfilePopup() {
    profilePopup.classList.add('popup_opened');
    fillProfileForm();
}

function closeProfilePopup() {
    profilePopup.classList.remove('popup_opened')
}

function formSubmitHandler(evt) {
    evt.preventDefault();

    const nameInput = nameInputElement.value;
    const jobInput = jobInputElement.value;

    profileName.textContent = nameInput;
    profileJob.textContent = jobInput;

    closeProfilePopup()
}

function fillProfileForm () {
    nameInputElement.value = profileName.innerText;
    jobInputElement.value = profileJob.innerText;
}

function renderCards() {
    for (let i = 0; i < cards.length; i++) {
      const card = cards[i];
      addCard(card.name, card.link);      
    }
}

function addCard(name, link, prepend = false) {
  const cardBlock = document.createElement('div');
  cardBlock.classList.add('elements__element');
  
  const image = document.createElement('img');
  image.classList.add('elements__photo');
  image.alt = name;
  image.src = link;
  image.addEventListener('click', (event) => {

    popupPicture.classList.add('popup_opened');
    const picture = popupPicture.querySelector('#previewImage');
    const clickedPicture = event.target;
    picture.src = clickedPicture.src;
    popupPictureDescription.innerText = clickedPicture.alt;
    
  });

  const group = document.createElement('div');
  group.classList.add('elements__group');

  const h2 = document.createElement('h2');
  h2.classList.add('elements__title');
  h2.innerText = name;

  const likeButton = document.createElement('button');
  likeButton.classList.add('elements__button');
  likeButton.type = 'button';
  likeButton.addEventListener('click', (event) => {

      const className = 'elements__button_liked';
      const classList = event.target.classList;

      if (classList.contains(className)) {
          classList.remove(className);
      } else {
          classList.add(className);
      }
      
  });

  group.append(h2, likeButton);
  cardBlock.append(image, group);

  if (prepend) {
    cardsContainer.prepend(cardBlock);
  } else {
    cardsContainer.append(cardBlock);
  }
}


renderCards();

