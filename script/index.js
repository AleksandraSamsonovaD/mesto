const profileEdit = document.querySelector('.profile__edit');
const profilePopup = document.querySelector('.popup_type_profile');
const profileCloseButton = profilePopup.querySelector('.popup__close');
const profileForm = profilePopup.querySelector('.popup__container');
const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__subtitle');
const newName = document.querySelector('[name = "profile-name"]');
const newDescription = document.querySelector('[name = "profile-description"]');
const elements = document.querySelector('.elements');
const elementTemplate = document.querySelector('#element-template').content;
const mestoPopup = document.querySelector('.popup_type_mesto');
const mestoEdit = document.querySelector('.profile__button');
const mestoCloseButton = mestoPopup.querySelector('.popup__close');
const mestoForm = mestoPopup.querySelector('.popup__container');
const mestoName = document.querySelector('[name = "mesto-name"]');
const mestoSrc = document.querySelector('[name = "mesto-description"]');
const imagePopup = document.querySelector('.popup_type_image');
const imageCloseButton = imagePopup.querySelector('.popup__close');
const imageName = imagePopup.querySelector('.popup__name');
const imageUrl = imagePopup.querySelector('.popup__image');
const bodyImagePopun = imagePopup.querySelector('.popup__body');
const bodyMestoPopun = mestoPopup.querySelector('.popup__body');
const bodyProfilePopun = profilePopup.querySelector('.popup__body');

const config = {
  formSelector: '.popup__container',
  inputSelector: '.popup__text',
  submitButtonSelector: '.popup__save',
  inputErrorClass: 'popup__text_type_error',
  errorActiveClass: 'popun__input-error_active',
};

const inputList = Array.from(mestoPopup.querySelectorAll(config.inputSelector));
const buttonElement = mestoPopup.querySelector(config.submitButtonSelector);

enableValidation(config);

function closedPopup(popup){
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown',listedKey);  
}

function saveProfileData(evt){
    evt.preventDefault();
    profileName.textContent = newName.value;
    profileDescription.textContent  = newDescription.value;
    closedPopup(profilePopup);
}

function addEmenent(name, addres){
  const element = elementTemplate.querySelector('.element').cloneNode(true);
  const imageEdit = element.querySelector('.element__image');

  element.querySelector('.element__title').textContent = name;
  element.querySelector('.element__image').src = addres;
  element.querySelector('.element__image').alt = name;
  

  element.querySelector('.element__trash').addEventListener('click',function(){
    element.remove();
  });
  element.querySelector('.element__like').addEventListener('click',function(evt){
    evt.target.classList.toggle('element__like_active');
  });

  imageEdit.addEventListener('click',openImagePopup);

  return element;
}

function saveMestoData(evt){
    evt.preventDefault();
    addCard(mestoName.value, mestoSrc.value);
    closedPopup(mestoPopup);
}
function listedKey(evt){
  if (evt.key === 'Escape'){
    const openerPopun = document.querySelector('.popup_opened');
    closedPopup(openerPopun);
  }
};

function addClassPopupOpened(popup){
  popup.classList.add('popup_opened');
  document.addEventListener('keydown',listedKey);  
}

function openMestoPopup(){
  addClassPopupOpened(mestoPopup);
  mestoForm.reset();
  toggleButtonState(inputList,buttonElement);
}

function openProfilePopup(){
  addClassPopupOpened(profilePopup);
  newName.value = profileName.textContent;
  newDescription.value = profileDescription.textContent;
}

function openImagePopup(evt){
  addClassPopupOpened(imagePopup);
  imageName.textContent = evt.target.alt;
  imageUrl.src = evt.target.src;
  imageUrl.alt = evt.target.alt;
}

function addCard(name,link){
  elements.prepend(addEmenent(name, link));
}

initialCards.forEach(item => addCard(item.name, item.link));

mestoEdit.addEventListener('click',openMestoPopup);
mestoCloseButton.addEventListener('click',()=>closedPopup(mestoPopup));
mestoForm.addEventListener('submit',saveMestoData);
imageCloseButton.addEventListener('click',()=>closedPopup(imagePopup));
profileEdit.addEventListener('click',openProfilePopup);
profileForm.addEventListener('submit',saveProfileData);
profileCloseButton.addEventListener('click',() => closedPopup(profilePopup));

profilePopup.addEventListener('click',() => closedPopup(profilePopup));
bodyProfilePopun.addEventListener('click',(evt)=> evt.stopPropagation());

mestoPopup.addEventListener('click',() => closedPopup(mestoPopup));
bodyMestoPopun.addEventListener('click',(evt)=> evt.stopPropagation());

imagePopup.addEventListener('click',() => closedPopup(imagePopup));
bodyImagePopun.addEventListener('click',(evt)=> evt.stopPropagation());
