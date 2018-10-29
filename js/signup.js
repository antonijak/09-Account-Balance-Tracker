const loginFields = [
  firstName = {
    field: document.querySelector('#first-name'),
    message: document.querySelector('#first-name-message'),
    validation: /[A-Z]{1}[A-Za-z]{2,10}[ -]?[A-Z]?[A-Za-z]{2,8}/
  },
  surname = {
    field: document.querySelector('#surname'),
    message: document.querySelector('#surname-message'),
    validation: /[A-Z]{1}[A-Za-z]{2,10}[ -]?[A-Z]?[A-Za-z]{2,8}/
  }
];

const username = {
  field: document.querySelector('#username'),
  message: document.querySelector('#username-message'),
  validation: /[A-Za-z\_\.\-]{3,14}/
}

const password = {
  field: document.querySelector('#password'),
  message: document.querySelector('#password-message'),
  validation: /.{8,14}/g
}

const signup = document.querySelector('#submit-signup');

let existingUsers = getFromLocalStorage('users') || [];


// *********************** FUNCTIONS ***********************

function inputValidation(field, message, validation){
  if (field.value.match(validation) && field.value.match(validation) == field.value) {
    field.style.border = '1px solid green';
    message.style.display = 'none';
  } else {
    field.style.border = '1px solid rgb(250, 94, 94)';
    message.style.display = 'block';
    field.value = null;
  }
}


function passwordValidation() {
  if (password.field.value && password.field.value.match(password.validation) && password.field.value.match(password.validation) == password.field.value) {
    password.field.style.border = '1px solid green';
    password.message.style.display = 'none';
  } else {
    password.field.style.border = '1px solid rgb(250, 94, 94)';
    password.message.style.display = 'block';
  }
}


function checkifUsernameExists() {
  let result = existingUsers.filter(existingUser => {
    if (username.field.value === existingUser.username) {
      return existingUser
    }
  })

  if(username.field.value.length === 0 && result.length === 0){
    username.field.style.border = '1px solid rgb(250, 94, 94)';
    username.message.innerHTML= 'Username required';
    username.message.style.display = 'block';
  } else if (username.field.value.length !== 0 && result.length === 0) {
    username.field.style.border = '1px solid green';
    username.message.style.display = 'none';
  } else {
    username.field.style.border = '1px solid rgb(250, 94, 94)';
    username.message.innerHTML= 'Username already exists';
    username.message.style.display = 'block';
    username.field.value = null;
  }
}


function validateAllInputs() {
  let count = 0;
  loginFields.forEach(item => {
    if (item.field.value) {
      count++
      item.message.style.display = 'none';
    } else {
      item.field.style.border = '1px solid rgb(250, 94, 94)';
      item.message.style.display = 'block';
    }
  })
  if (count === loginFields.length) {
    return true
  } else {
    return false
  }
}


function signUp() {
  if (validateAllInputs() && password.field.value) {
    let newUser = {
      name: loginFields[0].field.value,
      surname: loginFields[1].field.value,
      username: username.field.value,
      password: password.field.value
    }
    existingUsers.push(newUser);
    putInLocalStorage(existingUsers, 'users');
    window.location.href = './HTML/login.html';
  } else {
    alert('Please fill all the required fields')
    checkifUsernameExists();
    passwordValidation(password.field, password.message, password.validation);
  }
}



loginFields.forEach(item => item.field.addEventListener('change', () => {
  inputValidation(item.field, item.message, item.validation)
}));

username.field.addEventListener('change', checkifUsernameExists);

password.field.addEventListener('input', () => {passwordValidation(password.field, password.message, password.validation)});

signup.addEventListener('click', signUp);

