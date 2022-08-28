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
    const cardsContainer = document.querySelector('#cards');

    for (let i = 0; i < cards.length; i++) {
        const card = cards[i];

        const cardBlock = document.createElement('div');
        cardBlock.classList.add('elements__element');
        
        const image = document.createElement('img');
        image.classList.add('elements__photo');
        image.alt = card.name;
        image.src = card.link;

        const group = document.createElement('div');
        group.classList.add('elements__group');

        const h2 = document.createElement('h2');
        h2.classList.add('elements__title');
        h2.innerText = card.name;

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
        cardsContainer.append(cardBlock);
    }
}

renderCards();