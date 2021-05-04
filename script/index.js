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

function closedPopup(){
    const popupClose = document.querySelector('.popup_opened');
    popupClose.classList.remove('popup_opened');
}

function saveProfileData(evt){
    evt.preventDefault();
    profileName.textContent = newName.value;
    profileDescription.textContent  = newDescription.value;
    closedPopup();
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

  imageEdit.addEventListener('click',openPopup);

  return element;
}

function saveMestoData(evt){
    evt.preventDefault();
    addCard(mestoName.value, mestoSrc.value);
    closedPopup();
}

function openPopup(evt){
  switch (evt.target.name) {
    case "opener-profile":
      addClassPopupOpened(profilePopup);
      newName.value = profileName.textContent;
      newDescription.value = profileDescription.textContent;
      break;
    case "opener-mesto":
      addClassPopupOpened(mestoPopup);
      mestoForm.reset();
      break;
    case "opener-image":
      addClassPopupOpened(imagePopup);
      imageName.textContent = evt.target.alt;
      imageUrl.src = evt.target.src;
      break;
    default:
      alert('Нет такого окна');
  }
}

function addClassPopupOpened(popup){
  popup.classList.add('popup_opened');
}

function addCard(name,link){
  elements.prepend(addEmenent(name, link));
}

initialCards.forEach(item => addCard(item.name, item.link));

mestoEdit.addEventListener('click',openPopup);
mestoCloseButton.addEventListener('click',closedPopup);
mestoForm.addEventListener('submit',saveMestoData);
imageCloseButton.addEventListener('click',closedPopup);
profileEdit.addEventListener('click',openPopup);
profileForm.addEventListener('submit',saveProfileData);
profileCloseButton.addEventListener('click',closedPopup);