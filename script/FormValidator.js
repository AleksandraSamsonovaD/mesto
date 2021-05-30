export default class FormValidator{
    constructor(config, formSelector){
        this._config = config;
        this._formSelector = formSelector;
    }

    enableValidation(){
        const formList = Array.from(document.querySelectorAll(this._formSelector));
        formList.forEach((form)=>{
            this._setEventListener(form);
        })
    };

    _setEventListener(form){

        form.addEventListener('submit',(evt)=>{ 
            evt.preventDefault();
         });
    
        const inputList = Array.from(form.querySelectorAll(this._config.inputSelector));
        const buttonElement = form.querySelector((this._config.submitButtonSelector));
    
        inputList.forEach((input)=>{
            input.addEventListener('input',()=> {
                this._checkInputValidity(form, input);
                this.toggleButtonState(inputList,buttonElement);
            });
        })
        this.toggleButtonState(inputList, buttonElement);
    };

    
    toggleButtonState(input,button) {  
        button.disabled = this._hasInvalidInput(input); 
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
          this.hideError(form, formInput);
        }
    };

    hideError(form, input){
        const formError = form.querySelector(`.${input.id}-error`);
        input.classList.remove(this._config.inputErrorClass);
        formError.textContent = '';
        formError.classList.remove(this._config.errorActiveClass);
    };

    _showError(form, input, errorMessage){
        const formError = form.querySelector(`.${input.id}-error`);
        input.classList.add(this._config.inputErrorClass);
        formError.textContent = errorMessage;
        formError.classList.add(this._config.errorActiveClass);
    }
}