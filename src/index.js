import "./pages/index.css";
import { renderInitialCards, addCard } from "./components/card";
import { openPopup, closePopup } from "./components/modal";
import { enableValidation, disableButton } from "./components/validate";

const profileName = document.querySelector(".profile__name");
const profileDiscoverer = document.querySelector(".profile__discoverer");

const popupProfile = document.getElementById("profile_edit");
const popupProfileForm = popupProfile.querySelector(".popup__form");
const popupProfileInputName = popupProfile.querySelector(
  ".popup__form-input_name"
);
const popupProfileInputAbout = popupProfile.querySelector(
  ".popup__form-input_about"
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

export function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  profileName.textContent = popupProfileInputName.value;
  profileDiscoverer.textContent = popupProfileInputAbout.value;

  closePopup(popupProfile);
}

export function handleAddImageFormSubmit(evt) {
  evt.preventDefault();

  addCard(imageNameElement.value, imageLinkElement.value);
  closePopup(popupAddImage);
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

profileEditButton.addEventListener("click", handleEditProfileButton);
profileAddButton.addEventListener("click", handleAddImageButton);

popupProfileForm.addEventListener("submit", handleProfileFormSubmit);
popupAddImageForm.addEventListener("submit", handleAddImageFormSubmit);

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

renderInitialCards();
enableValidation({
  formSelector: ".popup__form",
  inputSelector: ".popup__form-input",
  submitButtonSelector: ".popup__form-button",
  inactiveButtonClass: "popup__form-button_inactive",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__input-error_active",
});
