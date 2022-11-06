import "./pages/index.css";
import { renderInitialCards } from "./components/card";
import {
  handleEscape,
  handleProfileFormSubmit,
  handleAddImageFormSubmit,
  popupProfileForm,
  handleEditProfileButton,
  handleAddImageButton,
  popupAddImageForm,
} from "./components/modal";
import { enableValidation } from "./components/validate";

const profileEditButton = document.querySelector(".profile__button");
const profileAddButton = document.querySelector(".profile__add-button");

document.addEventListener("keydown", handleEscape);

profileEditButton.addEventListener("click", handleEditProfileButton);
profileAddButton.addEventListener("click", handleAddImageButton);

popupProfileForm.addEventListener("submit", handleProfileFormSubmit);
popupAddImageForm.addEventListener("submit", handleAddImageFormSubmit);

renderInitialCards();
enableValidation({
  formSelector: ".popup__form",
  inputSelector: ".popup__form-input",
  submitButtonSelector: ".popup__form-button",
  inactiveButtonClass: "popup__form-button_inactive",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__input-error_active",
});
