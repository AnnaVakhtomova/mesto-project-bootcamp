import { openPopup } from "./modal";

const photoCards = document.querySelector(".photo__cards");
const cardTemplate = document.querySelector("#card").content;
const popupImage = document.querySelector("#image_popup");
const popupImageImg = popupImage.querySelector(".popup__image ");
const popupImageTitle = popupImage.querySelector(".popup__image-title");

const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

export function renderInitialCards() {
  initialCards.forEach((element) => {
    const card = createCard(element.name, element.link);
    photoCards.append(card);
  });
}

export function addCard(name, link) {
  const card = createCard(name, link);
  photoCards.prepend(card);
}

function createCard(name, link) {
  const card = cardTemplate.querySelector(".photo__card").cloneNode(true);
  const photoImage = card.querySelector(".photo__image");
  photoImage.src = link;
  photoImage.alt = name;

  card.querySelector(".photo__title").textContent = name;
  card
    .querySelector(".photo__like")
    .addEventListener("click", function (event) {
      event.target.classList.toggle("photo__like_active");
    });
  card
    .querySelector(".photo__delete")
    .addEventListener("click", function (event) {
      event.target.closest(".photo__card").remove();
    });

  photoImage.addEventListener("click", function (event) {
    popupImageImg.src = link;
    popupImageImg.alt = name;
    popupImageTitle.textContent = name;

    openPopup(popupImage);
  });

  return card;
}
