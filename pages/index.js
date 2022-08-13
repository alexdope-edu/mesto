
// Profile Popups
let profilePopup = document.querySelector('#profilePopup');
let nameInputElement = profilePopup.querySelector('.popup__name');
let jobInputElement = profilePopup.querySelector('.popup__text');
let profileFormElement = profilePopup.querySelector('.popup__content');

// Profile Buttons
let profileEditButton = document.querySelector('.profile__edit');
let profileCloseButton = document.querySelector('.popup__close');

// Profile Selectors
let profileName = document.querySelector('.profile__title');
let profileJob = document.querySelector('.profile__subtitle');


profileEditButton.addEventListener('click', () => {
    openPopup(profilePopup);

    fillProfileForm();
});


profileCloseButton.addEventListener('click', () => {
  closePopup(profilePopup)
  
});

profileFormElement.addEventListener('submit', formSubmitHandler);

function openPopup (element) {
    element.classList.add('popup_opened')
}

function closePopup (element) {
    element.classList.remove('popup_opened')
}

function formSubmitHandler (evt) {
    evt.preventDefault();


    const nameInput = nameInputElement.value;
    const jobInput = jobInputElement.value;

    profileName.textContent = nameInput;
    profileJob.textContent = jobInput;

    closePopup(profilePopup);
}

function fillProfileForm () {
    nameInputElement.value = profileName.innerText;
    jobInputElement.value = profileJob.innerText; 
    
}
