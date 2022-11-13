export function openPopup(popup) {
  document.addEventListener("keydown", handleEscape);
  popup.classList.add("popup_opened");
}

export function closePopup(popup) {
  document.removeEventListener("keydown", handleEscape);
  popup.classList.remove("popup_opened");
}

function handleEscape(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_opened");
    closePopup(openedPopup);
  }
}
