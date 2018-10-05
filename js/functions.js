function putInLocalStorage(arr, local) {
  let bla = JSON.stringify(arr);
  localStorage.setItem(local, bla);
}

function getFromLocalStorage(local) {
  let result = JSON.parse(localStorage.getItem(local));
  return result
}

function numbersWithZero(number) {
  return String("000" + number).slice(-2);
}

function displayDateTime() {
  var date = new Date();
  var day = numbersWithZero(date.getDate());
  var month = numbersWithZero(date.getMonth() + 1);
  var year = date.getFullYear();
  var hour = numbersWithZero(date.getHours());
  var minutes = numbersWithZero(date.getMinutes());
  return `<span id= "date">${day}/${month}/${year}</span> <span id= "time">${hour}:${minutes}</span>`
}

function userIdGenerator() {
  var characters = '123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'

  var id = '';
  for (i = 0; i < 7; i++) {
    var random = Math.floor(Math.random() * 35);
    id = id.concat(characters.charAt(random));
  }
  return id
}

function checkLocalStorage(what, local, field) {
  if (getFromLocalStorage('incomes') && getFromLocalStorage('expenses')) {
      let array = getFromLocalStorage(local);
      array.forEach(element => {
        what.push(element)
      });
      what.forEach(item => personAccount.display(field, item.description, item.amount, item.time))
      personAccount.accountBalance();
      fields.totalBalance.textContent = `${personAccount.balance.toString()} €`;
    }
  }
  