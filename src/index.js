import "./pages/index.css";
import { renderInitialCards, addCard } from "./components/card";
import { openPopup, closePopup } from "./components/modal";
import { enableValidation, disableButton } from "./components/validate";
import * as Api from "./components/api";

const profileName = document.querySelector(".profile__name");
const profileDiscoverer = document.querySelector(".profile__discoverer");
const profileAvatar = document.querySelector(".profile__avatar");

const popupProfile = document.getElementById("profile_edit");
const popupProfileForm = popupProfile.querySelector(".popup__form");
const popupProfileInputName = popupProfile.querySelector(
  ".popup__form-input_name"
);
const popupProfileInputAbout = popupProfile.querySelector(
  ".popup__form-input_about"
);
const popupProfileFormButton = popupProfileForm.querySelector(
  ".popup__form-button"
);

const popupAddImage = document.getElementById("image_add");
const popupAddImageForm = popupAddImage.querySelector(".popup__form");
const imageNameElement = popupAddImage.querySelector(".popup__form-input_name");
const imageLinkElement = popupAddImage.querySelector(
  ".popup__form-input_about"
);
const popupAddImageButton = popupAddImageForm.querySelector(
  ".popup__form-button"
);

const profileEditButton = document.querySelector(".profile__button");
const profileAddButton = document.querySelector(".profile__add-button");

const changeAvatarButtonElement = document.querySelector(
  ".profile__avatar-container"
);
const popupChangeAvatar = document.getElementById("change_avatar_popup");
const changeAvatarForm = popupChangeAvatar.querySelector(".popup__form");
const avatarInputElement = popupChangeAvatar.querySelector(
  ".popup__form-input_about"
);
const popupChangeAvatarButton = popupChangeAvatar.querySelector(
  ".popup__form-button"
);

function renderProfileInfo(name, about, avatar) {
  profileName.textContent = name;
  profileDiscoverer.textContent = about;
  profileAvatar.src = avatar;
}

Api.getInfo()
  .then((result) => {
    renderProfileInfo(result.name, result.about, result.avatar);
    return result._id;
  })
  .then((userId) => {
    Api.getCards().then((cards) => renderInitialCards(cards, userId));
  });

export function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  popupProfileFormButton.textContent = "Сохранение...";
  Api.editProfile(popupProfileInputName.value, popupProfileInputAbout.value)
    .then((result) =>
      renderProfileInfo(result.name, result.about, result.avatar)
    )
    .finally((_) => {
      closePopup(popupProfile);
      popupProfileFormButton.textContent = "Сохранить";
    });
}

export function handleAddImageFormSubmit(evt) {
  evt.preventDefault();
  popupAddImageButton.textContent = "Сохранение...";
  Api.addCard(imageNameElement.value, imageLinkElement.value)
    .then((result) => addCard(result.owner._id, result.name, result.link))
    .finally((_) => {
      closePopup(popupAddImage);
      popupAddImageButton.textContent = "Сохранить";
    });
}

export function handleEditProfileButton() {
  popupProfileInputName.value = profileName.textContent;
  popupProfileInputAbout.value = profileDiscoverer.textContent;
  openPopup(popupProfile);
}

export function handleAddImageButton() {
  popupAddImageForm.reset();
  disableButton(popupAddImageButton, "popup__form-button_inactive");
  openPopup(popupAddImage);
}

function handleOpenPopupChangeAvatar() {
  changeAvatarForm.reset();
  disableButton(popupChangeAvatarButton, "popup__form-button_inactive");
  openPopup(popupChangeAvatar);
}

export function handleChangeAvatarFormSubmit(evt) {
  evt.preventDefault();
  popupChangeAvatarButton.textContent = "Сохранение...";
  Api.changeAvatar(avatarInputElement.value)
    .then((result) => {
      profileAvatar.src = result.avatar;
    })
    .finally((_) => {
      closePopup(popupChangeAvatar);
      popupChangeAvatarButton.textContent = "Сохранить";
    });
}

profileEditButton.addEventListener("click", handleEditProfileButton);
profileAddButton.addEventListener("click", handleAddImageButton);
changeAvatarButtonElement.addEventListener(
  "click",
  handleOpenPopupChangeAvatar
);

popupProfileForm.addEventListener("submit", handleProfileFormSubmit);
popupAddImageForm.addEventListener("submit", handleAddImageFormSubmit);
changeAvatarForm.addEventListener("submit", handleChangeAvatarFormSubmit);

document.querySelectorAll(".popup").forEach((popup) => {
  popup.addEventListener("mousedown", (evt) => {
    if (
      evt.target === evt.currentTarget ||
      evt.target.classList.contains("popup__close")
    ) {
      closePopup(popup);
    }
  });
});

enableValidation({
  formSelector: ".popup__form",
  inputSelector: ".popup__form-input",
  submitButtonSelector: ".popup__form-button",
  inactiveButtonClass: "popup__form-button_inactive",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__input-error_active",
});
