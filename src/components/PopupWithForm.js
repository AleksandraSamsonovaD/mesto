import Popup from "./Popup.js";

export default class PopupWithForm extends Popup{
    constructor(popupSelector, submitForm, openForm){
        super(popupSelector);
        this._submitForm = submitForm;
        this._openForm = openForm;
    }
    _getInputValues(){
        this._inputList = this._popup.querySelectorAll('.popup__text');
    
        this._formValues = {};
        this._inputList.forEach(input => this._formValues[input.name] = input.value);

        return this._formValues;
    }
    setEventListeners(){
        super.setEventListeners();
        
        this._popup.addEventListener('submit',() => {
            this._submitForm(this._getInputValues()) 
        }
        );
        
    }
    close(){
        
        this._popup.querySelector('.popup__container').reset();
        super.close();
    }

    open(){
        
        this._openForm(this._popup);
        super.open();
    }
    
}