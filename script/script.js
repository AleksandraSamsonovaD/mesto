let edit = document.querySelector('.profile__edit');
let popun = document.querySelector('.popup');
let closePopunButton = document.querySelector('.popup__close');
let save = document.querySelector('.popup__save');
let newName = document.querySelector('.popup__name');
let newDescription = document.querySelector('.popup__description');
let profileName = document.querySelector('.profile__title');
let profileDescription = document.querySelector('.profile__subtitle');
function openPopun(){
    popun.classList.add('popup_opened');
    newName.value = profileName.textContent;
    newDescription.value = profileDescription.textContent;
}
function closedPopun(){
    popun.classList.remove('popup_opened');
}
function saveData(evt){
    evt.preventDefault();
    console.log(newName.textContent);
    profileName.textContent = newName.value;
    profileDescription.textContent = newDescription.value;
    closedPopun();
}
edit.addEventListener('click',openPopun);
popun.addEventListener('submit',saveData);
closePopunButton.addEventListener('click',closedPopun);