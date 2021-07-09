import Popup from "./Popup";

export default class PopupWithFormId extends Popup{
    constructor(popupSelector, submitForm){
        super(popupSelector);
        this._submitForm = submitForm;
    }
    open(id, removeFunction){
        this._id= id;
        this._removeFunction = removeFunction;
        super.open();
    }
    setEventListeners(){
        super.setEventListeners();
        
        this._popup.addEventListener('submit',(evt) => {
            evt.preventDefault();
            this._submitForm(this._id, this._removeFunction) 
        }
        );
        
    }
}