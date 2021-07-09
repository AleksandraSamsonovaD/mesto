export default class FormValidator{
    constructor(config, formElement){
        this._config = config;
        this._formElement = formElement;
        this._inputList = Array.from(this._formElement.querySelectorAll(this._config.inputSelector));
        this._buttonElement = this._formElement.querySelector((this._config.submitButtonSelector));
    }

    enableValidation(){
        this._setEventListener();
    };

    _setEventListener(){

        this._formElement.addEventListener('submit',(evt)=>{ 
            evt.preventDefault();
         });
    
        this._inputList.forEach((input)=>{
            input.addEventListener('input',()=> {
                this._checkInputValidity(this._formElement, input);
                this._toggleButtonState();
            });
        })
        this._toggleButtonState();
    };

    
    _toggleButtonState() {  
        this._buttonElement.disabled = this._hasInvalidInput(this._inputList); 
    };

    _hasInvalidInput(input) {
        return input.some(function(item){
          return !item.validity.valid;
        })
    };

    _checkInputValidity(form, formInput){
        if (!formInput.validity.valid) {
          this._showError(form,formInput, formInput.validationMessage);
        } else {
          this._hideError(form, formInput);
        }
    };

    _hideError(form, input){
        const formError = form.querySelector(`.${input.id}-error`);
        input.classList.remove(this._config.inputErrorClass);
        formError.textContent = '';
        formError.classList.remove(this._config.errorActiveClass);
    };
    hideErrors(){
       this._toggleButtonState()
       this._inputList.forEach((input) => { this._hideError(this._formElement, input) });
    }
    _showError(form, input, errorMessage){
        const formError = form.querySelector(`.${input.id}-error`);
        input.classList.add(this._config.inputErrorClass);
        formError.textContent = errorMessage;
        formError.classList.add(this._config.errorActiveClass);
    }
}