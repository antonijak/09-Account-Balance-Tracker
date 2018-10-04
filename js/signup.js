const loginFields = {
  firstName: document.querySelector('#first-name'),
  surname: document.querySelector('#surname'),
  username: document.querySelector('#username'),
  password: document.querySelector('#password'),
  logUsername: document.querySelector('#log-username'),
  signup: document.querySelector('#submit-signup')
}
loginFields.password.addEventListener('keyup', () => loginFields.signup.removeAttribute('disabled'));
console.log(loginFields.signup);

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

  } else {
    console.log('no');
  }
}



function checkLocalStorage() {
  if (personAccount.income.length === 0 && getFromLocalStorage('incomes') !== null) {
    let array = getFromLocalStorage('incomes');
    array.forEach(element => {
      personAccount.income.push(element)
    });
    personAccount.income.forEach(income => personAccount.displayIncome(income.description, income.amount, income.time))
  }

  if (personAccount.expense.length === 0 && getFromLocalStorage('expenses') !== null) {
    let array1 = getFromLocalStorage('expenses');
    array1.forEach(element => {
      personAccount.expense.push(element)
    });
    personAccount.expense.forEach(expense => personAccount.displayExpense(expense.description, expense.amount, expense.time))
  }
  personAccount.accountBalance();
  fields.totalBalance.textContent = `${personAccount.balance.toString()} €`;
}