const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ];
const profileEdit = document.querySelector('.profile__edit');
const profilePopun = document.querySelector('.popup_type_profile');
const profileCloseButton = profilePopun.querySelector('.popup__close');
const profileForm = profilePopun.querySelector('.popup__container');

let profileName = document.querySelector('.profile__title');
let profileDescription = document.querySelector('.profile__subtitle');
let newName = document.querySelector('[name = "profile-name"]');
let newDescription = document.querySelector('[name = "profile-description"]');

function openProfilePopun(){
    profilePopun.classList.add('popup_opened');
    newName.value = profileName.textContent;
    newDescription.value = profileDescription.textContent;
}

function closedProfilePopup(){
    profilePopun.classList.remove('popup_opened');
}

function saveProfileData(evt){
    evt.preventDefault();
    profileName.textContent = newName.value;
    profileDescription.textContent  = newDescription.value;
    closedProfilePopup();
}

profileEdit.addEventListener('click',openProfilePopun);
profileForm.addEventListener('submit',saveProfileData);
profileCloseButton.addEventListener('click',closedProfilePopup);

const elements = document.querySelector('.elements');
initialCards.forEach(item => addEmenent(item.name, item.link));

function addEmenent(name, addres){
    const elementTemplate = document.querySelector('#element-template').content;
    const element = elementTemplate.querySelector('.element').cloneNode(true);

    element.querySelector('.element__title').textContent = name;
    element.querySelector('.element__image').src = addres;
    elements.prepend(element);

    element.querySelector('.element__trash').addEventListener('click',function(){
      element.remove();
    });
    element.querySelector('.element__like').addEventListener('click',function(evt){
      evt.target.classList.toggle('element__like_active');
    });

    const imageEdit = element.querySelector('.element__image');

    imageEdit.addEventListener('click',function(){
      imagePopun.classList.add('popup_opened');
      imagePopun.querySelector('.popup__name').textContent = name;
      imagePopun.querySelector('.popup__image').src = addres;
    });
}

const mestoPopun = document.querySelector('.popup_type_mesto');
const mestoEdit = document.querySelector('.profile__button');
const mestoCloseButton = mestoPopun.querySelector('.popup__close');
const mestoForm = mestoPopun.querySelector('.popup__container');
let mestoName = document.querySelector('[name = "mesto-name"]');
let mestoSrc = document.querySelector('[name = "mesto-description"]');

function openMestoPopup(){
    mestoPopun.classList.add('popup_opened');
}
function closedMestoPopup(){
    mestoPopun.classList.remove('popup_opened');
    mestoName.value = '';
    mestoSrc.value ='';
}
function saveMestoData(evt){
    evt.preventDefault();
    addEmenent(mestoName.value, mestoSrc.value);
    closedMestoPopup();
}
mestoEdit.addEventListener('click',openMestoPopup);
mestoCloseButton.addEventListener('click',closedMestoPopup);
mestoForm.addEventListener('submit',saveMestoData);

const imagePopun = document.querySelector('.popup_type_image');
const imageCloseButton = imagePopun.querySelector('.popup__close');
function closedImagePopup(){
  imagePopun.classList.remove('popup_opened');
}

imageCloseButton.addEventListener('click',closedImagePopup);