// Выбираем элемент ошибки на основе уникального класса

const showError = (
  form,
  element,
  errorMessage,
  inputErrorClass,
  errorClass
) => {
  const formInputError = form.querySelector(`.${element.id}-error`);

  element.classList.add(inputErrorClass);
  // Показываем сообщение об ошибке
  formInputError.textContent = errorMessage;
  formInputError.classList.add(errorClass);
};

const hideError = (form, element, inputErrorClass, errorClass) => {
  const formInputError = form.querySelector(`.${element.id}-error`);

  element.classList.remove(inputErrorClass);
  // Скрываем сообщение об ошибке
  formInputError.classList.remove(errorClass);
  formInputError.textContent = "";
};

const checkInputValidity = (form, element, inputErrorClass, errorClass) => {
  if (!element.validity.valid) {
    showError(
      form,
      element,
      element.validationMessage,
      inputErrorClass,
      errorClass
    );
  } else {
    hideError(form, element, inputErrorClass, errorClass);
  }
};

export const enableValidation = ({
  formSelector,
  inputSelector,
  submitButtonSelector,
  inactiveButtonClass,
  inputErrorClass,
  errorClass,
}) => {
  // Найдём все формы с указанным классом в DOM,
  // сделаем из них массив методом Array.from
  const formList = Array.from(document.querySelectorAll(formSelector));

  // Переберём полученную коллекцию
  formList.forEach((formElement) => {
    // Для каждой формы вызовем функцию setEventListeners,
    // передав ей элемент формы
    setEventListeners(
      formElement,
      inputSelector,
      submitButtonSelector,
      inactiveButtonClass,
      inputErrorClass,
      errorClass
    );
  });
};

const setEventListeners = (
  formElement,
  inputSelector,
  submitButtonSelector,
  inactiveButtonClass,
  inputErrorClass,
  errorClass
) => {
  // Находим все поля внутри формы,
  // сделаем из них массив методом Array.from
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  const buttonElement = formElement.querySelector(submitButtonSelector);

  // Вызовем toggleButtonState, чтобы не ждать ввода данных в поля
  toggleButtonState(inputList, buttonElement, inactiveButtonClass);

  inputList.forEach((inputElement) => {
    // каждому полю добавим обработчик события input
    inputElement.addEventListener("input", () => {
      // Внутри колбэка вызовем isValid,
      // передав ей форму и проверяемый элемент
      checkInputValidity(
        formElement,
        inputElement,
        inputErrorClass,
        errorClass
      );
      toggleButtonState(inputList, buttonElement, inactiveButtonClass);
    });
  });
};

// Функция принимает массив полей ввода
// и элемент кнопки, состояние которой нужно менять

const toggleButtonState = (inputList, buttonElement, inactiveButtonClass) => {
  // Если есть хотя бы один невалидный инпут
  if (hasInvalidInput(inputList)) {
    // сделай кнопку неактивной
    buttonElement.classList.add(inactiveButtonClass);
  } else {
    // иначе сделай кнопку активной
    buttonElement.classList.remove(inactiveButtonClass);
  }
};

const hasInvalidInput = (inputList) => {
  console.log(inputList);
  inputList.forEach((element) => {
    console.log(element.validity);
  });
  //todo

  // проходим по этому массиву методом some
  return inputList.some((inputElement) => {
    // Если поле не валидно, колбэк вернёт true
    // Обход массива прекратится и вся функция
    // hasInvalidInput вернёт true
    return !inputElement.validity.valid;
  });
};
