const profileEditButton = document.querySelector('.profile__button');
const profileName = document.querySelector('.profile__name');
const profileDiscoverer = document.querySelector('.profile__discoverer');


const popupProfile = document.getElementById('profile_edit');
const popupProfileCloseButton = popupProfile.querySelector('.popup__close');
const popupProfileForm = popupProfile.querySelector('.popup__form');
const popupProfileInputName = popupProfile.querySelector('.popup__form-input_name');
const popupProfileInputAbout = popupProfile.querySelector('.popup__form-input_about');

const popupAddImage = document.getElementById('image_add');
const popupAddImageCloseButton = popupAddImage.querySelector('.popup__close');
const popupAddImageForm = popupAddImage.querySelector('.popup__form');

const popupImage = document.getElementById('image_popup');
const popupImageCloseButton = popupImage.querySelector('.popup__close');
const popupImg = popupImage.querySelector('.popup__image');
const popupImgTitle = popupImage.querySelector('.popup__image-title');

const photoCards = document.querySelector('.photo__cards');
const cardTemplate = document.querySelector('#card').content;
const profileAddButton = document.querySelector('.profile__add-button');


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
  
function openPopupProfileEdit() {
  const name = profileName.textContent;
  const about = profileDiscoverer.textContent;

  popupProfileInputName.value = name;
  popupProfileInputAbout.value = about;

  popupProfile.classList.add('popup_opened');
}

function closePopupProfileEdit() {
  popupProfile.classList.remove('popup_opened');  
}

function formSubmitHandlerSaveProfile (evt) {
  evt.preventDefault(); 
  
  profileName.textContent = popupProfileInputName.value;
  profileDiscoverer.textContent = popupProfileInputAbout.value;

  closePopupProfileEdit();
}

function openPopupAddImage() {
  popupAddImage.classList.add('popup_opened');
}

function closePopupAddImage() {
  popupAddImage.classList.remove('popup_opened');  
}

function formSubmitHandlerAddImage (evt) {
  evt.preventDefault(); 

  const nameElement = popupAddImage.querySelector('.popup__form-input_name');
  const linkElement = popupAddImage.querySelector('.popup__form-input_about');

  

  const name = nameElement.value;
  const link = linkElement.value;

  addCard(name, link);
  closePopupAddImage();
  nameElement.value = "";
  linkElement.value = "";

}


function renderInitialCards() {
  initialCards.forEach(element => {
    const card = createCard(element.name, element.link);
    photoCards.append(card); 
  });
}

function addCard(name, link) {
  const card = createCard(name, link);
  photoCards.prepend(card); 
}

function createCard(name, link) {
  const card = cardTemplate.querySelector('.photo__card').cloneNode(true);
  const photo__image = card.querySelector('.photo__image');
  photo__image.src = link;
  photo__image.alt = name;

  card.querySelector('.photo__title').textContent = name;
  card.querySelector('.photo__like').addEventListener('click', function (event) {
    event.target.classList.toggle('photo__like_active')
  });
  card.querySelector('.photo__delete').addEventListener('click', function (event) {
    event.target.closest('.photo__card').remove();
  }); 

  card.querySelector('.photo__image').addEventListener('click', function (event) {
    popupImg.src = link;
    popupImg.alt = name;
    popupImgTitle.textContent = name;
    openPopupImage();
  });

  return card;
}

function openPopupImage() {
  popupImage.classList.add('popup_opened');  
}

function closePopupImage() {
  popupImage.classList.remove('popup_opened');  
  popupImg.src = '';
  popupImg.alt = '';
  popupImgTitle.textContent = '';
}

renderInitialCards();
profileEditButton.addEventListener('click', openPopupProfileEdit);
popupProfileCloseButton.addEventListener('click', closePopupProfileEdit);
popupProfileForm.addEventListener('submit', formSubmitHandlerSaveProfile); 

profileAddButton.addEventListener('click', openPopupAddImage);
popupAddImageCloseButton.addEventListener('click', closePopupAddImage);
popupAddImageForm.addEventListener('submit', formSubmitHandlerAddImage); 

popupImageCloseButton.addEventListener('click', closePopupImage);
