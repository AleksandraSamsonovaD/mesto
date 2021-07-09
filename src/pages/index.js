import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";
import PopupWithFormId from "../components/PopupWithFormId.js";
import {profileEdit,
        mestoEdit,
        config,
        formMesto,
        formProfile,
        formPhoto,
        newName,
        newDescription,
        photoEdit
      } from "../untils/constants.js";
import './index.css';

function rendererLoging(isLoading, form){
  const formButton =document.querySelector(form).querySelector('.popup__save');
  if (isLoading){
    formButton.textContent  = 'Сохранение...';
  }
  else {
    formButton.textContent = 'Сохраненить'
  }
}

const api = new Api('https://mesto.nomoreparties.co/v1/cohort-25/','cb542bb8-f2ee-4727-827f-133e0aa782d9');
let userId;
api.getUserInfo()
      .then(result =>{
        document.querySelector('.profile__title').textContent = result.name;
        document.querySelector('.profile__subtitle').textContent = result.about;
        document.querySelector('.profile__avatar').src = result.avatar;
        userId = result._id
      })
      .catch(err => console.log(err));
api.getCards()
  .then(result => {
    result.forEach(res =>{
      createCard({ name: res.name, addres: res.link, likes: res.likes, idUser:res.owner._id, id:res._id });
    })
  })
  .catch(err => console.log(err));

  const deletePopupClass = new PopupWithFormId('.popup_type_delete',
  (deleteIdCard, removeFunction) => {
      return api.deleteCard(deleteIdCard)
       .then((result)=>{
        removeFunction();
        deletePopupClass.close();
       })
       .catch(err => console.log(err))
  }
)

const imagePopupClass = new PopupWithImage('.popup_type_image');

const validMesto = new FormValidator(config, formMesto);
validMesto.enableValidation();

const validProfile = new FormValidator(config, formProfile);
validProfile.enableValidation();

const validPhoto = new FormValidator(config, formPhoto);
validPhoto.enableValidation();

function createCard(form){
  const element = new Card( form
    , '#element-template'
    , (evt) => imagePopupClass.open(evt)
    , (evt, removeFunction) => {
      deletePopupClass.open(evt,removeFunction);
    }
    , (id, updateLikes) => 
      api.setLike(id)
      .then((result) => {
        updateLikes(result.likes.length)
      })
      .catch(err => console.log(err))
    , (id, updateLikes)=>
      api.deleteLike(id)
       .then((result) => {
        updateLikes(result.likes.length)
       })
       .catch(err => console.log(err))
    );
    const elementCard = element.generateCard(userId);
    cardSection.setItem(elementCard);
}

const cardSection = new Section(
  {
    items: []
    ,
    renderer: (item) => {
      createCard({ name: item.name, addres: item.link, likes: item.likes, idUser: item.owner._id , id: item._id });
    }
  },
  '.elements'
);
cardSection.renderItems();


const userInfo = new UserInfo({ name: '.profile__title', description: '.profile__subtitle' });

const profilePopupClass = new PopupWithForm('.popup_type_profile',
  (form) => {
    rendererLoging(true,'.popup_type_profile');
    api.setUserInfo({name: form.name, about: form.description})
    .then((result)=> {
      profilePopupClass.close();
      userInfo.setUserInfo({name: result.name, description:result.about });
    } )
    .catch(err => console.log(err))
    .finally(()=> rendererLoging(false,'.popup_type_profile'))
  },
  (popup) => {
    const userData = userInfo.getUserInfo();
    newName.value = userData.name;
    newDescription.value = userData.description;
    validProfile.hideErrors(popup);
  });

const mestoPopupClass = new PopupWithForm('.popup_type_mesto',
  (form) => {
    rendererLoging(true,'.popup_type_mesto');
    api.setCard({name: form.name, link: form.addres})
    .then(result =>{
      mestoPopupClass.close();
      createCard({ name: result.name , addres: result.link, likes: result.likes, idUser:result.owner._id, id:result._id });
    })
    .catch(err => console.log(err))
    .finally(()=> rendererLoging(false,'.popup_type_mesto'));
  },
  (popup) => {
    validMesto.hideErrors(popup);
  }
);
const photoPopupClass = new PopupWithForm('.popup_type_photo',
  (form) => {
    rendererLoging(true,'.popup_type_photo');
    api.editAvatar({avatar:form.addres})
    .then(result => {console.log(result)
      document.querySelector('.profile__avatar').src = result.avatar;
      photoPopupClass.close();})
    .catch(err => console.log(err))
    .finally(()=> rendererLoging(false, '.popup_type_photo'));
    },
  (popup) => validPhoto.hideErrors(popup)
);


mestoEdit.addEventListener('click', () => mestoPopupClass.open());
mestoPopupClass.setEventListeners();
deletePopupClass.setEventListeners();

imagePopupClass.setEventListeners();

profileEdit.addEventListener('click', () => profilePopupClass.open());
profilePopupClass.setEventListeners();

photoEdit.addEventListener('click', () => photoPopupClass.open());
photoPopupClass.setEventListeners();
