import { addCard } from "./card";

const profileName = document.querySelector(".profile__name");
const profileDiscoverer = document.querySelector(".profile__discoverer");
const popupProfile = document.getElementById("profile_edit");
export const popupProfileForm = popupProfile.querySelector(".popup__form");
const popupProfileInputName = popupProfile.querySelector(
  ".popup__form-input_name"
);
const popupProfileInputAbout = popupProfile.querySelector(
  ".popup__form-input_about"
);

const popupAddImage = document.getElementById("image_add");
export const popupAddImageForm = popupAddImage.querySelector(".popup__form");
const imageNameElement = popupAddImage.querySelector(".popup__form-input_name");
const imageLinkElement = popupAddImage.querySelector(
  ".popup__form-input_about"
);
const closeButtons = document.querySelectorAll(".popup__close");

export function openPopup(popup) {
  popup.classList.add("popup_opened");
}

export function closePopup(popup) {
  popup.classList.remove("popup_opened");
}

export function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  profileName.textContent = popupProfileInputName.value;
  profileDiscoverer.textContent = popupProfileInputAbout.value;

  closePopup(popupProfile);
}

export function handleAddImageFormSubmit(evt) {
  evt.preventDefault();

  const name = imageNameElement.value;
  const link = imageLinkElement.value;

  addCard(name, link);
  closePopup(popupAddImage);
  evt.target.reset();
}

export function handleEscape(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_opened");
    if (openedPopup) {
      closePopup(openedPopup);
    }
  }
}

export function handleEditProfileButton() {
  const name = profileName.textContent;
  const about = profileDiscoverer.textContent;

  popupProfileInputName.value = name;
  popupProfileInputAbout.value = about;
  openPopup(popupProfile);
}

export function handleAddImageButton() {
  popupAddImageForm.reset();
  openPopup(popupAddImage);
}

closeButtons.forEach((button) => {
  // находим 1 раз ближайший к крестику попап
  const popup = button.closest(".popup");
  popup.addEventListener("click", (evt) => {
    if (evt.target === popup) {
      closePopup(popup);
    }
  });

  // устанавливаем обработчик закрытия на крестик
  button.addEventListener("click", () => closePopup(popup));
});
