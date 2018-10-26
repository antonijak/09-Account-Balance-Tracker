const signupFields = {
  username: document.querySelector('#username'),
  password: document.querySelector('#password'),
  logIn: document.querySelector('#submit-login'),
  helpers: document.querySelectorAll('.helper'),
  wrong: document.querySelector('#wrong')
}

let existingUsers = getFromLocalStorage('users');
signupFields.logIn.addEventListener('click', userValidation);

function userValidation() {
  signupFields.helpers[0].style.color = 'rgb(238, 113, 113, 0)';
  signupFields.helpers[1].style.color = 'rgb(238, 113, 113, 0)';
  signupFields.wrong.style.color = 'rgb(238, 113, 113, 0)';

  // if user wrote username and password
  if (signupFields.username.value && signupFields.password.value) {
    //if we have users in localStorage
    if (existingUsers) {
      //find existing user
      let count = existingUsers.filter(existingUser => {
        if (existingUser.username === signupFields.username.value && existingUser.password === signupFields.password.value) {
          return existingUser
        }
      })
      
      if (count.length === 0) {
        signupFields.wrong.style.color = 'rgb(238, 113, 113, 1)';
      } else {
        window.location.href = './account.html';
      }
    }
  } else {

    for (let helper of signupFields.helpers) {
      helper.style.color = 'rgb(238, 113, 113, 1)';
    }
  }
  signupFields.username.value = '';
  signupFields.password.value = '';
}