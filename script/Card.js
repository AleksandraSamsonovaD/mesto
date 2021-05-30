import openImagePopup from "./index.js";

export default class Card {
    constructor(cardData, cardSelector) {
        this._cardSelector = cardSelector;
        this._name = cardData.name;
        this._url = cardData.addres;
    }
    _setEventListener(){
        this._element.querySelector('.element__trash').addEventListener('click',() => {
            this._removeElement();
          });
        this._element.querySelector('.element__like').addEventListener('click',() => {
            this._likeElement();
        });
        this._element.querySelector('.element__image').addEventListener('click',openImagePopup);
    }

    _likeElement(){
        this._element.querySelector('.element__like').classList.toggle('element__like_active');
    }

    _removeElement(){
        this._element.remove();
    }

    _getTemplate() {
        const cardElement = document
        .querySelector(this._cardSelector)
        .content
        .querySelector('.element')
        .cloneNode(true);
        return cardElement;
    };
    generateCard() {
        this._element = this._getTemplate();
        this._element.querySelector('.element__title').textContent = this._name;
        this._element.querySelector('.element__image').src = this._url;
        this._element.querySelector('.element__image').alt = this._name;

        this._setEventListener();

        return this._element;
    }
};