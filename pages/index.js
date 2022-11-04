const profileEditButton = document.querySelector('.profile__button');
const profileName = document.querySelector('.profile__name');
const profileDiscoverer = document.querySelector('.profile__discoverer');


const popupProfile = document.getElementById('profile_edit');
const popupProfileForm = popupProfile.querySelector('.popup__form');
const popupProfileInputName = popupProfile.querySelector('.popup__form-input_name');
const popupProfileInputAbout = popupProfile.querySelector('.popup__form-input_about');

const popupAddImage = document.getElementById('image_add');
const popupAddImageForm = popupAddImage.querySelector('.popup__form');
const nameElement = popupAddImage.querySelector('.popup__form-input_name');
const linkElement = popupAddImage.querySelector('.popup__form-input_about');

const popupImage = document.getElementById('image_popup');
const popupImg = popupImage.querySelector('.popup__image');
const popupImgTitle = popupImage.querySelector('.popup__image-title');

const photoCards = document.querySelector('.photo__cards');
const cardTemplate = document.querySelector('#card').content;
const profileAddButton = document.querySelector('.profile__add-button');


const closeButtons = document.querySelectorAll('.popup__close');


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
  
function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}






function handleProfileFormSubmit (evt) {
  evt.preventDefault(); 
  
  profileName.textContent = popupProfileInputName.value;
  profileDiscoverer.textContent = popupProfileInputAbout.value;

  closePopup(popupProfile);
}



function handleAddImageFormSubmit (evt) {
  evt.preventDefault(); 

  const name = nameElement.value;
  const link = linkElement.value;

  addCard(name, link);
  closePopup(popupAddImage);
  evt.target.reset();
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
  const photoImage = card.querySelector('.photo__image');
  photoImage.src = link;
  photoImage.alt = name;

  card.querySelector('.photo__title').textContent = name;
  card.querySelector('.photo__like').addEventListener('click', function (event) {
    event.target.classList.toggle('photo__like_active')
  });
  card.querySelector('.photo__delete').addEventListener('click', function (event) {
    event.target.closest('.photo__card').remove();
  }); 

  photoImage.addEventListener('click', function (event) {
    popupImg.src = link;
    popupImg.alt = name;
    popupImgTitle.textContent = name;

    openPopup(popupImage);
  });

  return card;
}




renderInitialCards();

profileEditButton.addEventListener('click', () => {
  const name = profileName.textContent;
  const about = profileDiscoverer.textContent;

  popupProfileInputName.value = name;
  popupProfileInputAbout.value = about;

  openPopup(popupProfile)
});
popupProfileForm.addEventListener('submit', handleProfileFormSubmit); 
profileAddButton.addEventListener('click', () => openPopup(popupAddImage));
popupAddImageForm.addEventListener('submit', handleAddImageFormSubmit); 




closeButtons.forEach((button) => {
  // находим 1 раз ближайший к крестику попап 
  const popup = button.closest('.popup');
  // устанавливаем обработчик закрытия на крестик
  button.addEventListener('click', () => closePopup(popup));
});





