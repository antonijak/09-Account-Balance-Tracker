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
  },
  username = {
    field: document.querySelector('#username'),
    message: document.querySelector('#username-message'),
    validation: /[A-Za-z\_\.\-]{3,14}/
  }
]

const password = {
  field: document.querySelector('#password'),
  message: document.querySelector('#password-message'),
  validation: /.{8,14}/g
}

const signup = document.querySelector('#submit-signup');
signup.addEventListener('click', signUp1);


let users = getFromLocalStorage('users') || [];


function signUp1() {
  if (validateAllInputs() && password.field.value) {
    let newUser = {
      name: loginFields[0].field.value,
      surname: loginFields[1].field.value,
      username: loginFields[2].field.value,
      password: password.field.value
    }
    users.push(newUser);
    putInLocalStorage(users, 'users');
    window.location.href = './HTML/login.html';
  } else {
   
    passwordValidation();
     alert('no');
  }
}

const inputValidation = (field, message, validation) => {

  if (field.value.match(validation) && field.value.match(validation) == field.value) {
    field.style.border = '1px solid green';
    message.style.display = 'none';
  } else {
    field.style.border = '1px solid rgb(250, 94, 94)';
    message.style.display = 'block';
    field.value = null;

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

function passwordValidation() {
 
 console.log(password.field.value);

  if (password.field.value && password.field.value.match(password.validation) && password.field.value.match(password.validation) == password.field.value) {
    password.field.style.border = '1px solid green';
    password.message.style.display = 'none';
  } else {
    password.field.style.border = '1px solid rgb(250, 94, 94)';
    password.message.style.display = 'block';
  }
}

loginFields.forEach(item => item.field.addEventListener('change', () => {
  inputValidation(item.field, item.message, item.validation)
}));
password.field.addEventListener('input', () => {
  passwordValidation(password.field, password.message, password.validation)
})


// if('valid'){
//   signup.removeAttribute('disabled');
// } else {
//   signup.setAttribute('disabled', 'true');
// }