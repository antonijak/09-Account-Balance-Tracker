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
  deleteExpense: document.querySelector('#delete-expense')
}

let incomes = [];
let expenses = [];


let personAccount = {
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
    let dateTime = displayDateTime();
    fields.income.appendChild(incomeI);
    let thisIncome = {};
    thisIncome.incomeKey = incomeKey;
    thisIncome.incomeValue = incomeValue;
    thisIncome.dateTime = dateTime;
    incomes.push(thisIncome);
    incomeI.innerHTML = `${incomeKey}: ${incomeValue} € ${dateTime}`;
    
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
    let dateTime = displayDateTime();
    expenseI.innerHTML = `${expenseKey}: ${expenseValue} € ${dateTime}`;
    fields.expense.appendChild(expenseI);
    let thisExpense = {};
    thisExpense.expenseKey = expenseKey;
    thisExpense.expenseValue = expenseValue;
    thisExpense.dateTime = dateTime;
    expenses.push(thisExpense);
  },
  accountBalance: function () {
    this.balance = this.totalIncome() - this.totalExpense();
    return this.balance
  }

}



function onClickRun() {
  var re = /[0-9]+/;
  let trueOrNot = re.test(fields.amount.value);
  console.log(incomes);
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

fields.add.addEventListener('click', onClickRun);
fields.deleteIncome.addEventListener('click', deleteAndCalculateIncome);
fields.deleteExpense.addEventListener('click', deleteAndCalculateExpense);


function deleteAndCalculateIncome() {
  personAccount.income.splice(-1, 1);
  incomes.splice(-1, 1);
  fields.income.innerHTML = '';
  for (income of incomes){
    let span = document.createElement('span');
    fields.income.appendChild(span);
    span.innerHTML = `${income.incomeKey}: ${income.incomeValue} € ${income.dateTime}<br/>`
  }
  personAccount.totalIncome();
  personAccount.totalExpense();
  personAccount.accountBalance();
  fields.totalBalance.textContent = personAccount.balance + ' €';
}

function deleteAndCalculateExpense() {
  personAccount.expense.splice(-1, 1)
  expenses.splice(-1, 1);
  fields.expense.innerHTML = '';
  for (expense of expenses){
    let span = document.createElement('span');
    fields.expense.appendChild(span);
    span.innerHTML = `${expense.expenseKey}: ${expense.expenseValue} € ${expense.dateTime}<br/>`
  }
  personAccount.totalIncome();
  personAccount.totalExpense();
  personAccount.accountBalance();
  fields.totalBalance.textContent = personAccount.balance + ' €';
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

console.log(incomes);