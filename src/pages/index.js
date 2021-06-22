import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import {profileEdit,
        mestoEdit,
        config,
        initialCards
      } from "../untils/constants.js";
import './index.css';


const imagePopupClass = new PopupWithImage('.popup_type_image');

const validMesto = new FormValidator(config, '#form-mesto');
validMesto.enableValidation();

const validProfile = new FormValidator(config, '#form-profile');
validProfile.enableValidation();

const cardSection = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const element = new Card({ name: item.name, addres: item.link }
        , '#element-template'
        , (evt) => imagePopupClass.open(evt));
      const elementCard = element.generateCard();
      cardSection.setItem(elementCard);
    }
  },
  '.elements'
);
cardSection.renderItems();

const cardRenderer = new Section({
  items: []
}, '.elements');

const userInfo = new UserInfo({ name: '.profile__title', description: '.profile__subtitle' });

const profilePopupClass = new PopupWithForm('.popup_type_profile',
  (form) => {
    userInfo.setUserInfo(form);
    profilePopupClass.close();
  },
  (popup) => {
    const newName = popup.querySelector('[name = "name"]');
    const newDescription = popup.querySelector('[name = "description"]');
    newName.value = userInfo.getUserInfo().name;
    newDescription.value = userInfo.getUserInfo().description;
    const inputList = Array.from(popup.querySelectorAll(config.inputSelector));
    const buttonElement = popup.querySelector(config.submitButtonSelector);
    validProfile.toggleButtonState(inputList, buttonElement);
    inputList.forEach((input) => { validProfile.hideError(popup, input) });
  });

const mestoPopupClass = new PopupWithForm('.popup_type_mesto',
  (form) => {
    const element = new Card(form, '#element-template', (evt) => imagePopupClass.open(evt));
    const elementCard = element.generateCard();
    cardRenderer.setItem(elementCard);
    mestoPopupClass.close();
  },
  (popup) => {
    const inputList = Array.from(popup.querySelectorAll(config.inputSelector));
    const buttonElement = popup.querySelector(config.submitButtonSelector);
    validMesto.toggleButtonState(inputList, buttonElement);
    const mestoForm = popup.querySelector('.popup__container');
    inputList.forEach((input) => { validMesto.hideError(mestoForm, input) });
  }
);

mestoEdit.addEventListener('click', () => mestoPopupClass.open());
mestoPopupClass.setEventListeners();

imagePopupClass.setEventListeners();

profileEdit.addEventListener('click', () => profilePopupClass.open());
profilePopupClass.setEventListeners();

