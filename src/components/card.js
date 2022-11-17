import * as Api from "./api";
import { openPopup } from "./modal";

const photoCards = document.querySelector(".photo__cards");
const cardTemplate = document.querySelector("#card").content;
const popupImage = document.querySelector("#image_popup");
const popupImageImg = popupImage.querySelector(".popup__image ");
const popupImageTitle = popupImage.querySelector(".popup__image-title");

export function renderInitialCards(cards, userId) {
  cards.forEach((element) => {
    const card = createCard(
      element._id,
      element.name,
      element.link,
      element.likes.length,
      element.owner._id === userId
    );
    photoCards.append(card);
  });
}

export function addCard(id, name, link, likes) {
  const card = createCard(id, name, link, likes, true);
  photoCards.prepend(card);
}

function createCard(id, name, link, likes, canDelete) {
  const card = cardTemplate.querySelector(".photo__card").cloneNode(true);
  const photoImage = card.querySelector(".photo__image");
  photoImage.src = link;
  photoImage.alt = name;

  const likeCountElement = card.querySelector(".photo__like-count");
  likeCountElement.textContent = likes;
  card.querySelector(".photo__title").textContent = name;
  card
    .querySelector(".photo__like")
    .addEventListener("click", function (event) {
      if (event.target.classList.contains("photo__like_active")) {
        Api.dislike(id).then((result) => {
          event.target.classList.remove("photo__like_active");
          likeCountElement.textContent = result.likes.length;
        });
      } else {
        Api.like(id).then((result) => {
          event.target.classList.add("photo__like_active");
          likeCountElement.textContent = result.likes.length;
        });
      }
    });

  const deleteButton = card.querySelector(".photo__delete");
  if (canDelete) {
    deleteButton.addEventListener("click", function (event) {
      Api.deleteCard(id).then(() => {
        event.target.closest(".photo__card").remove();
      });
    });
  } else {
    deleteButton.remove();
  }

  photoImage.addEventListener("click", function (event) {
    popupImageImg.src = link;
    popupImageImg.alt = name;
    popupImageTitle.textContent = name;

    openPopup(popupImage);
  });

  return card;
}
