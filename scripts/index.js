
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