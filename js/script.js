const fields = {
  warning: document.querySelector('#warning'),
  description: document.querySelector('#description'),
  amount: document.querySelector('#amount'),
  transactionType: document.querySelector('#transaction-type'),
  add: document.querySelector('#add'),
  income: document.querySelector('#income'),
  expense: document.querySelector('#expense'),
  totalBalance: document.querySelector('#total-balance'),
  totalIncome: document.querySelector('#total-income'),
  totalExpense: document.querySelector('#total-expense'),
  deleteIncome: document.querySelector('#delete-income'),
  deleteExpense: document.querySelector('#delete-expense'),
}

let personAccount = {
  income: [],
  expense: [],
  balance: 0,
  total(what) {
    let amounts = what.map(item => parseInt(item.amount));
    let sum = 0;
    for (let amount of amounts) {
      sum += amount
    }
    return sum
  },
  add(what, name) {
    let ieKey = fields.description.value;
    let ieValue = fields.amount.value;
    let ieTime = displayDateTime();
    let uniqueId = userIdGenerator();
    let newIncome = {};
    newIncome.description = ieKey;
    newIncome.amount = ieValue;
    newIncome.time = ieTime;
    newIncome.id = uniqueId;
    what.push(newIncome);
    this.accountBalance();
    if (name === 'income'){
      this.display(fields.income, ieKey, ieValue, ieTime)
    } else {
      this.display(fields.expense, ieKey, ieValue, ieTime);
    }
    putInLocalStorage(what, name + 's');
  },
  display(field, key, value, time) {
    let incomeI = document.createElement('div');
    let dateThing = document.createElement('span');
    let name = document.createElement('span');
    let onlyAmount = document.createElement('span');
    field.appendChild(incomeI);
    incomeI.appendChild(dateThing);
    incomeI.appendChild(name);
    incomeI.appendChild(onlyAmount);
    incomeI.className = 'added-on-delete';
    name.className = 'name';
    onlyAmount.className = 'amount'
    dateThing.innerHTML = time;
    name.innerHTML = key;
    onlyAmount.innerHTML = value + ' €';
    fields.totalIncome.textContent = this.total(personAccount.income) + ' €';
    fields.totalExpense.textContent = this.total(personAccount.expense) + ' €';
  },
  delete(field, what) {
    if (confirm('Are you sure you want to delete last entry?') === true) {
      what.splice(-1, 1);
      field.innerHTML = '';
      for (let item of what) {
        personAccount.display(field, item.description, item.amount, item.time)
      }
      personAccount.total(what);
      personAccount.accountBalance();
      fields.totalIncome.textContent = personAccount.total(personAccount.income) + ' €';
      fields.totalExpense.textContent = personAccount.total(personAccount.expense) + ' €';
      fields.totalBalance.textContent = personAccount.balance + ' €';
      putInLocalStorage(personAccount.income, 'incomes')
      putInLocalStorage(personAccount.expense, 'expenses')
    }
  },
  accountBalance() {
    this.balance = this.total(this.income) - this.total(this.expense);
    if (this.balance < 0) {
      fields.totalBalance.style.color = 'red';
    } else {
      fields.totalBalance.style.color = 'black';
    }
    return this.balance
  }
}

function onClickRun() {
  if (fields.description.value && fields.amount.value && isFinite(fields.amount.value)) {
    fields.warning.style.bottom = '2000px';
    fields.description.removeAttribute('class', 'attention');
    fields.amount.removeAttribute('class', 'attention');
    if (fields.transactionType.value === 'income') {
      personAccount.add(personAccount.income, 'income');
      fields.totalBalance.textContent = `${personAccount.balance.toString()} €`;
    } else {
      personAccount.add(personAccount.expense, 'expense');
      fields.totalBalance.textContent = `${personAccount.balance.toString()} €`;
    }
  } else {
    fields.description.className = 'attention';
    fields.amount.className = 'attention';
    fields.warning.style.bottom = '-20px';
  }
  fields.description.value = '';
  fields.amount.value = '';
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

fields.add.addEventListener('click', onClickRun);
fields.deleteIncome.addEventListener('click', () => {personAccount.delete(fields.income, personAccount.income)});
fields.deleteExpense.addEventListener('click', () => {personAccount.delete(fields.expense, personAccount.expense)});

function checkLocalStorage() {
  if (personAccount.income.length === 0 && getFromLocalStorage('incomes') !== null) {
    let array = getFromLocalStorage('incomes');
    array.forEach(element => {
      personAccount.income.push(element)
    });
    personAccount.income.forEach(income => personAccount.display(fields.income, income.description, income.amount, income.time))
  }

  if (personAccount.expense.length === 0 && getFromLocalStorage('expenses') !== null) {
    let array1 = getFromLocalStorage('expenses');
    array1.forEach(element => {
      personAccount.expense.push(element)
    });
    personAccount.expense.forEach(expense => personAccount.display(fields.expense, expense.description, expense.amount, expense.time))
  }
  personAccount.accountBalance();
  fields.totalBalance.textContent = `${personAccount.balance.toString()} €`;
}

checkLocalStorage()