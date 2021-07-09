export const profileEdit = document.querySelector('.profile__edit');
export const mestoEdit = document.querySelector('.profile__button');
export const photoEdit = document.querySelector('.profile__avatar');

export const config = {
  formSelector: '.popup__container',
  inputSelector: '.popup__text',
  submitButtonSelector: '.popup__save',
  inputErrorClass: 'popup__text_type_error',
  errorActiveClass: 'popun__input-error_active',
};

export const formMesto = document.querySelector('#form-mesto');
export const formProfile = document.querySelector('#form-profile');
export const formPhoto = document.querySelector('#form-photo');
export const newName = formProfile.querySelector('[name = "name"]');
export const newDescription = formProfile.querySelector('[name = "description"]');