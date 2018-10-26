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
  },
  password = {
    field: document.querySelector('#password'),
    message: document.querySelector('#password-message'),
    validation: /.{8,14}/g
  }
]

const signup = document.querySelector('#submit-signup');
signup.addEventListener('click', signUp1);


let users = getFromLocalStorage('users') || [];


function signUp1() {
  let newUser = {
    name: loginFields[0].field.value,
    surname: loginFields[1].field.value,
    username: loginFields[2].field.value,
    password: loginFields[3].field.value
  }

  users.push(newUser);
  putInLocalStorage(users, 'users');
  window.location.href = './HTML/login.html';
}

const inputValidation = (field, message, validation) => {
  field.addEventListener('input', () => {
    console.log('change');
    
      if (field.value.match(validation) && field.value.match(validation) == field.value) {
        field.style.border = '1px solid green';
        message.style.display = 'none';
      } else {
        field.style.border = '1px solid rgb(250, 94, 94)';
        message.style.display = 'block';
      }
  })
}

loginFields.forEach(item => inputValidation(item.field, item.message, item.validation));



// if('valid'){
//   signup.removeAttribute('disabled');
// } else {
//   signup.setAttribute('disabled', 'true');
// }