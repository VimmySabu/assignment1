
const usernameEl = document.getElementById('username');
const emailEl = document.getElementById('email');
const phoneEl=document.getElementById('phone');
const passwordEl = document.getElementById('password');
const confirmPasswordEl = document.getElementById('confirm-password');

let timeout;


const togglePassword = document.getElementById("toggle-password");


const form = document.getElementById('signup');
let classes=(classes) => document.getElementsByClassName(classes);
let successIcon=classes("success-icon"),failureIcon=classes("failure-icon");



const checkUsername = () => {

    let valid = false;

    const min = 5,max = 25;

    const username = usernameEl.value.trim();

    if (!isRequired(username)) {
        showError(usernameEl, 'Username cannot be blank.');
        failureIcon[0].style.opacity = "1";
        successIcon[0].style.opacity = "0";

    } 
    else if (!isBetween(username.length, min, max)) {
        showError(usernameEl, `Username must be between ${min} and ${max} characters.`)
        failureIcon[0].style.opacity = "1";
        successIcon[0].style.opacity = "0";
      } 
    else {
        showSuccess(usernameEl);
        valid = true;
        failureIcon[0].style.opacity = "0";
        successIcon[0].style.opacity = "1";
    }
    return valid;
};


const checkEmail = () => {
    let valid = false;
    const email = emailEl.value.trim();
    if (!isRequired(email)) {
        showError(emailEl, 'Email cannot be blank.');
        failureIcon[1].style.opacity = "1";
        successIcon[1].style.opacity = "0";
    } else if (!isEmailValid(email)) {
        showError(emailEl, 'Email is not valid.')
        failureIcon[1].style.opacity = "1";
        successIcon[1].style.opacity = "0";
    } else {
        showSuccess(emailEl);
        failureIcon[1].style.opacity = "0";
        successIcon[1].style.opacity = "1";
        valid = true;
    }
    return valid;
};


const checkNumber = () => {
  let valid = false;
  const phone = phoneEl.value.trim();
  if (!isRequired(phone)) {
      showError(phoneEl, 'Phone number cannot be blank.');
      failureIcon[2].style.opacity = "1";
      successIcon[2].style.opacity = "0";
  } else if (!isPhoneValid(phone)) {
      showError(phoneEl, 'Accept numbers only.Should contain 10 numbers only.Accepts additional 3 formats: XXX-XXX-XXXX, XXX.XXX.XXXX, XXX XXX XXXX')
      failureIcon[2].style.opacity = "1";
      successIcon[2].style.opacity = "0";
  } else {
      showSuccess(phoneEl);
      failureIcon[2].style.opacity = "0";
      successIcon[2].style.opacity = "1";
      valid = true;
  }
  return valid;
};

const checkPassword = () => {
    let valid = false;


    const password = passwordEl.value.trim();
    

    if (!isRequired(password)) {
        showError(passwordEl, 'Password cannot be blank.');
        failureIcon[3].style.opacity = "1";
        successIcon[3].style.opacity = "0";
    } 
    else if (!isPasswordSecure(password)) {
        showError(passwordEl, 'Password must has at least 8 characters that include at least 1 lowercase character, 1 uppercase characters, 1 number, and 1 special character in (!@#$%^&*)');
        failureIcon[3].style.opacity = "1";
        successIcon[3].style.opacity = "0";
    } else {
        showSuccess(passwordEl);
        failureIcon[3].style.opacity = "0";
        successIcon[3].style.opacity = "1";
        valid = true;
    }
     
    return valid;
};

const checkConfirmPassword = () => {
    let valid = false;
    // check confirm password
    const confirmPassword = confirmPasswordEl.value.trim();
    const password = passwordEl.value.trim();

    if (!isRequired(confirmPassword)) {
        showError(confirmPasswordEl, 'Please enter the password again');
        failureIcon[4].style.opacity = "1";
        successIcon[4].style.opacity = "0";
    } else if (password !== confirmPassword) {
        showError(confirmPasswordEl, 'The password does not match');
        failureIcon[4].style.opacity = "1";
        successIcon[4].style.opacity = "0";
    } else {
        showSuccess(confirmPasswordEl);
        failureIcon[4].style.opacity = "0";
        successIcon[4].style.opacity = "1";
        valid = true;
    }

    return valid;
};
const isEmailValid = (email) => {
    const re = /^([a-zA-Z0-9\.-]+)@([a-zA-Z0-9\-]+)\.([a-z]{2,8})(.[a-z]{2,8})?$/;
    return re.test(email);
};

const isPhoneValid = (phone) => {
    const reX =RegExp(/^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/);
    return reX.test(phone);
};

const isPasswordSecure = (password) => {
    const re = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
    return re.test(password);
};

const isRequired = value => value === '' ? false : true;
const isBetween = (length, min, max) => length < min || length > max ? false : true;


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

let strengthBadge = document.getElementById('StrengthDisp');
let strongPassword = new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})')
let mediumPassword = new RegExp('((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{6,}))|((?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9])(?=.{8,}))')

function StrengthChecker(PasswordParameter) {
    
    if(strongPassword.test(PasswordParameter)) {
        strengthBadge.style.backgroundColor = "rgb(6, 104, 50)";
        strengthBadge.textContent = 'Strong';
    } else if(mediumPassword.test(PasswordParameter)) {
        strengthBadge.style.backgroundColor = 'orange';
        strengthBadge.textContent = 'Medium';
    } else {
        strengthBadge.style.backgroundColor = 'red';
        strengthBadge.textContent = 'Weak';
    }
}

passwordEl.addEventListener("input", () => {
    strengthBadge.style.display = 'block';
    clearTimeout(timeout);
    timeout = setTimeout(() => StrengthChecker(passwordEl.value), 500);
    if(passwordEl.value.length !== 0) {
        strengthBadge.style.display != 'block';
    } else {
        strengthBadge.style.display = 'none';
    }
});

togglePassword.addEventListener("click", toggleClicked);
    function toggleClicked() {  
        if (this.checked) {
          passwordEl.type = "text";
          confirmPasswordEl.type="text";
        } else {
          passwordEl.type = "password";
          confirmPasswordEl.type="password";
        }
        
      }


form.addEventListener('submit', function (e) {
    // prevent the form from submitting
    e.preventDefault();

    // validate fields
    let isUsernameValid = checkUsername(),
        isEmailValid = checkEmail(),
        isPhoneValid=checkNumber(),
        isPasswordValid = checkPassword(),
        isConfirmPasswordValid = checkConfirmPassword();

    let isFormValid = isUsernameValid &&
        isEmailValid &&
        isPhoneValid&&
        isPasswordValid &&
        isConfirmPasswordValid;

    // submit to the server if the form is valid
    if (isFormValid) {
        //console.log(isFormValid);
        window.location.href=form.getAttribute("action")
    }
        
});

const debounce = (fn, delay = 100) => {
    let timeoutId;
    return (...args) => {
        // cancel the previous timer
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        // setup a new timer
        timeoutId = setTimeout(() => {
            fn.apply(null, args)
        }, delay);
    };
};

form.addEventListener('input', debounce(function (e) {
    switch (e.target.id) {
        case 'username':
            checkUsername();
            break;
        case 'email':
            checkEmail();
            break;
        case 'phone':
            checkNumber();
            break;
        case 'password':
            checkPassword();
            break;
        case 'confirm-password':
            checkConfirmPassword();
            break;
    }
}));



