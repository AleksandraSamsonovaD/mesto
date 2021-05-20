function showError(form, input, errorMessage, config){
    const { inputErrorClass, errorActiveClass } = config;
    const formError = form.querySelector(`.${input.id}-error`);
    input.classList.add(inputErrorClass);
    formError.textContent = errorMessage;
    formError.classList.add(errorActiveClass);
};

function hideError(form, input, config){
    const { inputErrorClass, errorActiveClass } = config;
    const formError = form.querySelector(`.${input.id}-error`);
    input.classList.remove(inputErrorClass);
    formError.textContent = '';
    formError.classList.remove(errorActiveClass);
};
function checkInputValidity(form, formInput, config){
    if (!formInput.validity.valid) {
      showError(form,formInput, formInput.validationMessage, config);
    } else {
      hideError(form, formInput, config);
    }
};

function setEventListener(form, config){
    const { inputSelector, submitButtonSelector, ...restConfig } = config;

    form.addEventListener('submit',(evt)=>{ 
        evt.preventDefault();
     });

    const inputList = Array.from(form.querySelectorAll(inputSelector));
    const buttonElement = form.querySelector(submitButtonSelector);

    inputList.forEach((input)=>{
        input.addEventListener('input',()=> {
            checkInputValidity(form, input, restConfig);
            toggleButtonState(inputList,buttonElement);
        });
    })
    toggleButtonState(inputList, buttonElement);
};

function enableValidation({ formSelector, ...restConfig }){
    const formList = Array.from(document.querySelectorAll(formSelector));
    formList.forEach((form)=>{
        setEventListener(form,restConfig);
    })
};

function hasInvalidInput(input) {
    return input.some(function(item){
      return !item.validity.valid;
    })
};

function toggleButtonState(input,button) {  
    button.disabled = hasInvalidInput(input); 
};
