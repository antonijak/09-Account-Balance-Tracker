const fields = {
  warning: document.querySelector('#warning'),
  description: document.querySelector('#description'),
  amount: document.querySelector('#amount'),
  transactionType: document.querySelector('#transaction-type'),
  add: document.querySelector('#add'),
  income: document.querySelector('#income'),
  incomeItem: document.querySelector('#income-item'),
  incomeDate: document.querySelector('#income-date'),
  incomeTime: document.querySelector('#income-time'),
  expense: document.querySelector('#expense'),
  expenseItem: document.querySelector('#expense-item'),
  expenseDate: document.querySelector('#expense-date'),
  expenseTime: document.querySelector('#expense-time'),
  totalBalance: document.querySelector('#total-balance'),
  deleteIncome: document.querySelector('#delete-income'),
}

function onClickRun() {
  var re = /[0-9]+/;
  let trueOrNot = re.test(fields.amount.value);

  if (fields.description.value !== '' && fields.amount.value !== '' && trueOrNot === true) {
    fields.warning.style.top = '200000px';
    if (fields.transactionType.value === 'income') {
      personAccount.addIncome();
      fields.totalBalance.textContent = `${personAccount.balance.toString()} €`;
    } else {
      personAccount.addExpense();
      fields.totalBalance.textContent = `${personAccount.balance.toString()} €`;
    }
    if (personAccount.balance < 0) {
      fields.totalBalance.style.color = 'red';
    }
    
    fields.description.style.border = '1px solid black';
    fields.amount.style.border = '1px solid black';
  } else if (fields.description.value !== '' && fields.amount.value !== '' && trueOrNot === false) {
    fields.description.style.border = '1px solid red';
    fields.amount.style.border = '1px solid red';
    fields.warning.style.top = '-20px';
  } else {
    fields.description.style.border = '1px solid red';
    fields.amount.style.border = '1px solid red';
    fields.warning.style.top = '-20px';
  }
  fields.description.value = '';
    fields.amount.value = '';
}

add.addEventListener('click', onClickRun);

var personAccount = {
  income: [],
  expense: [],
  balance: 0,
  incomeOrExpenseValue: function (expression) {
    let result;
    if (fields.transactionType.value === expression) {
      result = parseInt(fields.amount.value);
    }
    return result
  },
  incomeOrExpenseDescription: function (expression) {
    let result;
    if (fields.transactionType.value === expression) {
      result = fields.description.value
    }
    return result
  },
  totalIncome: function () {
    let amounts = this.income.map(function (item) {
      return item.amount
    })
    let sum = 0;
    for (let i = 0; i < amounts.length; i++) {
      sum += amounts[i]
    }
    return sum
  },
  totalExpense: function () {
    let amounts = this.expense.map(function (item) {
      return item.amount
    })
    let sum = 0;
    for (let i = 0; i < amounts.length; i++) {
      sum += amounts[i]
    }
    return sum
  },
  addIncome: function () {
    let incomeKey = this.incomeOrExpenseDescription('income');
    let incomeValue = this.incomeOrExpenseValue('income');
    let newIncome = {};
    newIncome.description = incomeKey;
    newIncome.amount = incomeValue;
    this.income.push(newIncome);
    this.accountBalance();
    let incomeI = document.createElement('div');
    incomeI.innerHTML = `${incomeKey}: ${incomeValue} € ${displayDateTime()}`;
    fields.income.appendChild(incomeI);
  },
  addExpense: function () {
    let expenseKey = this.incomeOrExpenseDescription('expense');
    let expenseValue = this.incomeOrExpenseValue('expense');
    let newExpense = {};
    newExpense.description = expenseKey;
    newExpense.amount = expenseValue;
    this.expense.push(newExpense);
    this.accountBalance();
    let expenseI = document.createElement('div');
    expenseI.innerHTML = `${expenseKey}: ${expenseValue} € ${displayDateTime()}`;
    fields.expense.appendChild(expenseI);
  },
  accountBalance: function () {
    this.balance = this.totalIncome() - this.totalExpense();
    return this.balance
  }

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