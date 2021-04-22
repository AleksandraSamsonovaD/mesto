let edit = document.querySelector('.profile__edit');
let popup = document.querySelector('.popup');
let closePopunButton = document.querySelector('.popup__close');
let newName = document.querySelector('.popup__name');
let newDescription = document.querySelector('.popup__description');
let profileName = document.querySelector('.profile__title');
let profileDescription = document.querySelector('.profile__subtitle');
function openPopup(){
    popup.classList.add('popup_opened');
    newName.value = profileName.textContent;
    newDescription.value = profileDescription.textContent;
}
function closedPopup(){
    popup.classList.remove('popup_opened');
}
function saveData(evt){
    evt.preventDefault();
    profileName.textContent = newName.value;
    profileDescription.textContent = newDescription.value;
    closedPopup();
}
edit.addEventListener('click',openPopup);
popup.addEventListener('submit',saveData);
closePopunButton.addEventListener('click',closedPopup);