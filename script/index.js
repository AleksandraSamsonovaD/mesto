let edit = document.querySelector('.profile__edit');
let popup = document.querySelector('.popup');
let closePopunButton = document.querySelector('.popup__close');
let profileName = document.querySelector('.profile__title');
let profileDescription = document.querySelector('.profile__subtitle');
let form = document.querySelector('.popup__container');
let newName = document.querySelector('[name = "profile-name"]');
let newDescription = document.querySelector('[name = "profile-description"]');
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
    profileDescription.textContent  = newDescription.value;
    closedPopup();
}
edit.addEventListener('click',openPopup);
form.addEventListener('submit',saveData);
closePopunButton.addEventListener('click',closedPopup);