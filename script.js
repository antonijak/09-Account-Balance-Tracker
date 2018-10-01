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
  deleteExpense: document.querySelector('#delete-expense')
}

let personAccount = {
  income: [],
  expense: [],
  balance: 0,
  totalIncome: function () {
    let amounts = this.income.map(function (item) {
      return parseInt(item.amount)
    })
    let sum = 0;
    for (let i = 0; i < amounts.length; i++) {
      sum += amounts[i]
    }
    return sum
  },
  totalExpense: function () {
    let amounts = this.expense.map(function (item) {
      return parseInt(item.amount)
    })
    let sum = 0;
    for (let i = 0; i < amounts.length; i++) {
      sum += amounts[i]
    }
    return sum
  },
  addIncome: function () {
    let incomeKey = fields.description.value;
    let incomeValue = fields.amount.value;
    let incomeTime = displayDateTime();
    let newIncome = {};
    newIncome.description = incomeKey;
    newIncome.amount = incomeValue;
    newIncome.time = incomeTime;
    this.income.push(newIncome);
    this.accountBalance();
    this.displayIncome(incomeKey, incomeValue, incomeTime)
  },
  displayIncome: function (incomeKey, incomeValue, incomeTime) {
    let incomeI = document.createElement('div');
    let dateThing = document.createElement('span');
    let name = document.createElement('span');
    let onlyAmount = document.createElement('span');
    fields.income.appendChild(incomeI);
    incomeI.appendChild(dateThing);
    incomeI.appendChild(name);
    incomeI.appendChild(onlyAmount);
    incomeI.className = 'added-on-delete';
    dateThing.innerHTML = incomeTime;
    name.innerHTML = incomeKey;
    name.className = 'name';
    onlyAmount.innerHTML = incomeValue + ' €';
    onlyAmount.className = 'amount'
    let thisIncome = {};
    thisIncome.incomeKey = incomeKey;
    thisIncome.incomeValue = incomeValue;
    thisIncome.dateTime = incomeTime;
    fields.totalIncome.textContent = this.totalIncome() + ' €';
  },
  deleteAndCalculateIncome: function () {
    if (confirm('Are you sure you want to delete last entry?') === true) {
      personAccount.income.splice(-1, 1);
      console.log(personAccount.income);
      fields.income.innerHTML = '';
      for (income of personAccount.income) {
        personAccount.displayIncome(income.description, income.amount, income.time)
      }
      personAccount.totalIncome();
      personAccount.accountBalance();
      fields.totalIncome.textContent = personAccount.totalIncome() + ' €';
      fields.totalBalance.textContent = personAccount.balance + ' €';
    }
  },
  addExpense: function () {
    let expenseKey = fields.description.value;
    let expenseValue = fields.amount.value;
    let expenseTime = displayDateTime();
    let newExpense = {};
    newExpense.description = expenseKey;
    newExpense.amount = expenseValue;
    newExpense.time = expenseTime;
    this.expense.push(newExpense);
    this.accountBalance();
    this.displayExpense(expenseKey, expenseValue, expenseTime);
  },
  displayExpense: function (expenseKey, expenseValue, expenseTime) {
    let expenseI = document.createElement('div');
    let dateThing = document.createElement('span');
    let name = document.createElement('span');
    let onlyAmount = document.createElement('span');
    fields.expense.appendChild(expenseI);
    expenseI.appendChild(dateThing);
    expenseI.appendChild(name);
    expenseI.appendChild(onlyAmount);
    expenseI.className = 'added-on-delete';
    dateThing.innerHTML = expenseTime;
    name.innerHTML = expenseKey;
    name.className = 'name';
    onlyAmount.innerHTML = '-' + expenseValue + ' €';
    onlyAmount.className = 'amount'
    fields.totalExpense.textContent = '-' + this.totalExpense() + ' €';
  },
  deleteAndCalculateExpense: function () {
    if (confirm('Are you sure you want to delete last entry?') === true) {
      personAccount.expense.splice(-1, 1)
      fields.expense.innerHTML = '';
      for (expense of personAccount.expense) {
        personAccount.displayExpense(expense.description, expense.amount, expense.time)
      }
      personAccount.totalExpense();
      personAccount.accountBalance();
      fields.totalExpense.textContent = '-' + personAccount.totalExpense() + ' €';
      fields.totalBalance.textContent = personAccount.balance + ' €';
    }
  },
  accountBalance: function () {
    this.balance = this.totalIncome() - this.totalExpense();
    if (this.balance < 0) {
      fields.totalBalance.style.color = 'red';
    } else {
      fields.totalBalance.style.color = 'black';
    }
    return this.balance
  }
}

function onClickRun() {
  if (fields.description.value !== '' && fields.amount.value !== '' && isFinite(fields.amount.value)) {
    fields.warning.style.bottom = '2000px';
    fields.description.style.borderColor = 'rgb(235, 235, 235)';
    fields.amount.style.borderColor = 'rgb(235, 235, 235)';
    if (fields.transactionType.value === 'income') {
      personAccount.addIncome();
      fields.totalBalance.textContent = `${personAccount.balance.toString()} €`;
    } else {
      personAccount.addExpense();
      fields.totalBalance.textContent = `${personAccount.balance.toString()} €`;
    }
  } else {
    fields.description.style.border = '1px solid red';
    fields.amount.style.border = '1px solid red';
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

fields.add.addEventListener('click', onClickRun);
fields.deleteIncome.addEventListener('click', personAccount.deleteAndCalculateIncome);
fields.deleteExpense.addEventListener('click', personAccount.deleteAndCalculateExpense);