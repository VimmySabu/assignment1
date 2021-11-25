
var emailEl=document.getElementById("exampleInputEmail1");
var pwdEl=document.getElementById("exampleInputPassword1")
var form=document.getElementById("login");
var failureIcon=document.getElementsByClassName("failure-icon");
var successIcon=document.getElementsByClassName("success-icon");



//checking email conditions
const checkEmail = () => {
    let valid = false;
    const email = emailEl.value.trim();
    if (!isRequired(email)) {
        showError(emailEl, 'Email cannot be blank.');
        failureIcon[0].style.opacity = "1";
        successIcon[0].style.opacity = "0";
    } else if (!isEmailValid(email)) {
        showError(emailEl, 'Email is not valid.')
        failureIcon[0].style.opacity = "1";
        successIcon[0].style.opacity = "0";
    } else {
        showSuccess(emailEl);
        failureIcon[0].style.opacity = "0";
        successIcon[0].style.opacity = "1";
        valid = true;
    }
    return valid;
};
//checking password conditions

const checkPassword = () => {
    let valid = false;

    const min = 8,max = 25;
    const password = pwdEl.value.trim();
    

    if (!isRequired(password)) {
        showError(pwdEl, 'Password cannot be blank.');
        failureIcon[1].style.opacity = "1";
        successIcon[1].style.opacity = "0";
    } 
    else if (!isBetween(password.length, min, max)) {
        showError(pwdEl, `Password must be between ${min} and ${max} characters.`)
        failureIcon[1].style.opacity = "1";
        successIcon[1].style.opacity = "0";
      } 
     else {
        showSuccess(pwdEl);
        failureIcon[1].style.opacity = "0";
        successIcon[1].style.opacity = "1";
        valid = true;
    }
     
    return valid;
};

const isRequired = value => value === '' ? false : true;
const isBetween = (length, min, max) => length < min || length > max ? false : true;

const isEmailValid = (email) => {
    const re = /^([a-zA-Z0-9\.-]+)@([a-zA-Z0-9\-]+)\.([a-z]{2,8})(.[a-z]{2,8})?$/;
    return re.test(email);
};
const showError = (input, message) => {
    // get the form-field element
    const formField = input.parentElement;
    // add the error class
    formField.classList.remove('success');
    formField.classList.add('error');

    // show the error message
    const error = formField.querySelector('small');
    error.textContent = message;
};

const showSuccess = (input) => {
    // get the form-field element
    const formField = input.parentElement;

    // remove the error class
    formField.classList.remove('error');
    formField.classList.add('success');

    // hide the error message
    const error = formField.querySelector('small');
    error.textContent = '';
}


form.addEventListener('submit', function (e) {
    // prevent the form from submitting
    e.preventDefault();

    // validate fields
    let isEmailValid = checkEmail(),
        isPasswordValid = checkPassword();
        

    let isFormValid = isEmailValid && isPasswordValid ;
        

    // submit to the server if the form is valid
    if (isFormValid) {
        console.log(isFormValid);
        
        window.location.href=form.getAttribute("action");
    }
        
});

function debounce(fn, delay = 200) {
    let timeoutId;
    return (...args) => {
        // cancel the previous timer
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        // setup a new timer
        timeoutId = setTimeout(() => {
            fn.apply(null, args);
        }, delay);
    };
}

form.addEventListener('input', debounce(function (e) {
    switch (e.target.id) {
        
        case 'exampleInputEmail1':
            checkEmail();
            break;
        
        case 'exampleInputPassword1':
            checkPassword();
            break;
        
    }
}));






