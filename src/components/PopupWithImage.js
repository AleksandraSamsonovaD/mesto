import Popup from "./Popup.js";

export default class PopupWithImage extends Popup{
    open(evt){
        super.open();
        this._imageName = this._popup.querySelector('.popup__name');
        this._imageUrl = this._popup.querySelector('.popup__image');
        this._imageName.textContent = evt.target.alt;
        this._imageUrl.src = evt.target.src;
        this._imageUrl.alt = evt.target.alt;
    }
}