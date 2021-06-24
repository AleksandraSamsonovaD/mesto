import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import {profileEdit,
        mestoEdit,
        config,
        initialCards,
        formMesto,
        formProfile,
        newName,
        newDescription
      } from "../untils/constants.js";
import './index.css';



const imagePopupClass = new PopupWithImage('.popup_type_image');

const validMesto = new FormValidator(config, formMesto);
validMesto.enableValidation();

const validProfile = new FormValidator(config, formProfile);
validProfile.enableValidation();

function createCard(form){
  const element = new Card( form
    , '#element-template'
    , (evt) => imagePopupClass.open(evt));
  return element.generateCard();
}

const cardSection = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const elementCard = createCard({ name: item.name, addres: item.link });
      cardSection.setItem(elementCard);
    }
  },
  '.elements'
);
cardSection.renderItems();


const userInfo = new UserInfo({ name: '.profile__title', description: '.profile__subtitle' });

const profilePopupClass = new PopupWithForm('.popup_type_profile',
  (form) => {
    userInfo.setUserInfo(form);
    profilePopupClass.close();
  },
  (popup) => {
    const userData = userInfo.getUserInfo();
    newName.value = userData.name;
    newDescription.value = userData.description;
    validProfile.hideErrors(popup);
  });

const mestoPopupClass = new PopupWithForm('.popup_type_mesto',
  (form) => {
    const elementCard = createCard(form) 
    cardSection.setItem(elementCard);
    mestoPopupClass.close();
  },
  (popup) => {
    validMesto.hideErrors(popup);
  }
);

mestoEdit.addEventListener('click', () => mestoPopupClass.open());
mestoPopupClass.setEventListeners();

imagePopupClass.setEventListeners();

profileEdit.addEventListener('click', () => profilePopupClass.open());
profilePopupClass.setEventListeners();

