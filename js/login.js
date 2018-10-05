const signupFields = {
  username: document.querySelector('#username'),
  password: document.querySelector('#password'),
  logIn: document.querySelector('#submit-login'),
  helper: document.querySelectorAll('.helper'),
  wrong: document.querySelector('#wrong')
}

let existingUsers = getFromLocalStorage('users');
signupFields.logIn.addEventListener('click', userValidation);

function userValidation() {
  for (let e of signupFields.helper) {
    e.style.color = 'rgb(238, 113, 113, 0)';
  }
  signupFields.wrong.style.color = 'rgb(238, 113, 113, 0)';
  if (signupFields.username.value && signupFields.password.value) {
    if (existingUsers) {
      existingUsers.forEach(element => {
        if (element.username === signupFields.username.value && element.password === signupFields.password.value) {
          window.location.href = './account.html';
        } else {

          signupFields.wrong.style.color = 'rgb(238, 113, 113, 1)';
        }
      })
    }
  } else {

    for (let e of signupFields.helper) {
      e.style.color = 'rgb(238, 113, 113, 1)';
    }
  }
  signupFields.username.value = '';
  signupFields.password.value = '';
}