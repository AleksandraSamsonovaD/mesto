let edit = document.querySelector('.profile__edit');
let popup = document.querySelector('.popup');
let closePopunButton = document.querySelector('.popup__close');
let newValue = document.querySelectorAll('.popup__text');
let profileName = document.querySelector('.profile__title');
let profileDescription = document.querySelector('.profile__subtitle');
function openPopup(){
    popup.classList.add('popup_opened');
    newValue.item(0).value = profileName.textContent;
    newValue.item(1).value = profileDescription.textContent;
}
function closedPopup(){
    popup.classList.remove('popup_opened');
}
function saveData(evt){
    evt.preventDefault();
    profileName.textContent = newValue.item(0).value;
    profileDescription.textContent = newValue.item(1).value;
    closedPopup();
}
edit.addEventListener('click',openPopup);
popup.addEventListener('submit',saveData);
closePopunButton.addEventListener('click',closedPopup);