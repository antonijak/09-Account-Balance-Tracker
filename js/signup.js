const loginFields = {
  firstName: document.querySelector('#first-name'),
  surname: document.querySelector('#surname'),
  username: document.querySelector('#username'),
  password: document.querySelector('#password'),
  logUsername: document.querySelector('#log-username'),
  signup: document.querySelector('#submit-signup')
}
loginFields.password.addEventListener('keyup', () => loginFields.signup.removeAttribute('disabled'));
loginFields.signup.addEventListener('click', signUp1);

let users = getFromLocalStorage('users') || [];

function signUp1() {
  if (loginFields.firstName.value && loginFields.surname.value && loginFields.username.value && loginFields.password.value) {

    let newUser = {
      name: loginFields.firstName.value,
      surname: loginFields.surname.value,
      username: loginFields.username.value,
      password: loginFields.password.value
    }
    users.push(newUser);
    putInLocalStorage(users, 'users');
    window.location.href = './HTML/login.html';
  }
}