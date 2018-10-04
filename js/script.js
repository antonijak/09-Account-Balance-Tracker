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
  firstName: document.querySelector('#first-name'),
  surname: document.querySelector('#surname'),
  username: document.querySelector('#username'),
  password: document.querySelector('#password'),
  logUsername: document.querySelector('#log-username'),
  logPassword: document.querySelector('#log-password')
}

// class personAccount {
  //   constructor(income, expense, balance) {
  //     income = [],
  //       expense = [],
  //       balance = 0
  //   }
  //   totalIncome() {
  //     let amounts = this.income.map(function (item) {
  //       return parseInt(item.amount)
  //     })
  //     let sum = 0;
  //     for (let i = 0; i < amounts.length; i++) {
  //       sum += amounts[i]
  //     }
  //     return sum
  //   }
  //   totalExpense() {
  //     let amounts = this.expense.map(function (item) {
  //       return parseInt(item.amount)
  //     })
  //     let sum = 0;
  //     for (let i = 0; i < amounts.length; i++) {
  //       sum += amounts[i]
  //     }
  //     return sum
  //   }
  //   addIncome() {
  //     let incomeKey = fields.description.value;
  //     let incomeValue = fields.amount.value;
  //     let incomeTime = displayDateTime();
  //     let uniqueId = userIdGenerator();
  //     let newIncome = {};
  //     newIncome.description = incomeKey;
  //     newIncome.amount = incomeValue;
  //     newIncome.time = incomeTime;
  //     newIncome.id = uniqueId;
  //     this.income.push(newIncome);
  //     this.accountBalance();
  //     this.displayIncome(incomeKey, incomeValue, incomeTime)
  //     putInLocalStorage(this.income, 'incomes');
  //   }
  //   displayIncome(incomeKey, incomeValue, incomeTime) {
  //     let incomeI = document.createElement('div');
  //     let dateThing = document.createElement('span');
  //     let name = document.createElement('span');
  //     let onlyAmount = document.createElement('span');
  //     fields.income.appendChild(incomeI);
  //     incomeI.appendChild(dateThing);
  //     incomeI.appendChild(name);
  //     incomeI.appendChild(onlyAmount);
  //     incomeI.className = 'added-on-delete';
  //     dateThing.innerHTML = incomeTime;
  //     name.innerHTML = incomeKey;
  //     name.className = 'name';
  //     onlyAmount.innerHTML = incomeValue + ' €';
  //     onlyAmount.className = 'amount'
  //     let thisIncome = {};
  //     thisIncome.incomeKey = incomeKey;
  //     thisIncome.incomeValue = incomeValue;
  //     thisIncome.dateTime = incomeTime;
  //     fields.totalIncome.textContent = this.totalIncome() + ' €';
  //   }
  //   deleteAndCalculateIncome() {
  //     if (confirm('Are you sure you want to delete last entry?') === true) {
  //       personAccount.income.splice(-1, 1);
  //       console.log(personAccount.income);
  //       fields.income.innerHTML = '';
  //       for (income of personAccount.income) {
  //         personAccount.displayIncome(income.description, income.amount, income.time)
  //       }
  //       personAccount.totalIncome();
  //       personAccount.accountBalance();
  //       fields.totalIncome.textContent = personAccount.totalIncome() + ' €';
  //       fields.totalBalance.textContent = personAccount.balance + ' €';
  //       putInLocalStorage(personAccount.income, 'incomes')
  //     }
  //   }
  //   addExpense() {
  //     let expenseKey = fields.description.value;
  //     let expenseValue = fields.amount.value;
  //     let expenseTime = displayDateTime();
  //     let uniqueId = userIdGenerator();
  //     let newExpense = {};
  //     newExpense.description = expenseKey;
  //     newExpense.amount = expenseValue;
  //     newExpense.time = expenseTime;
  //     newExpense.id = uniqueId;
  //     this.expense.push(newExpense);
  //     this.accountBalance();
  //     this.displayExpense(expenseKey, expenseValue, expenseTime);
  //     putInLocalStorage(this.expense, 'expenses');
  //   }
  //   displayExpense(expenseKey, expenseValue, expenseTime) {
  //     let expenseI = document.createElement('div');
  //     let dateThing = document.createElement('span');
  //     let name = document.createElement('span');
  //     let onlyAmount = document.createElement('span');
  //     fields.expense.appendChild(expenseI);
  //     expenseI.appendChild(dateThing);
  //     expenseI.appendChild(name);
  //     expenseI.appendChild(onlyAmount);
  //     expenseI.className = 'added-on-delete';
  //     dateThing.innerHTML = expenseTime;
  //     name.innerHTML = expenseKey;
  //     name.className = 'name';
  //     onlyAmount.innerHTML = '-' + expenseValue + ' €';
  //     onlyAmount.className = 'amount'
  //     fields.totalExpense.textContent = '-' + this.totalExpense() + ' €';
  //   }
  //   deleteAndCalculateExpense() {
  //     if (confirm('Are you sure you want to delete last entry?') === true) {
  //       personAccount.expense.splice(-1, 1)
  //       fields.expense.innerHTML = '';
  //       for (expense of personAccount.expense) {
  //         personAccount.displayExpense(expense.description, expense.amount, expense.time)
  //       }
  //       personAccount.totalExpense();
  //       personAccount.accountBalance();
  //       fields.totalExpense.textContent = '-' + personAccount.totalExpense() + ' €';
  //       fields.totalBalance.textContent = personAccount.balance + ' €';
  //       putInLocalStorage(personAccount.expense, 'expenses')
  //     }
  //   }
  //   accountBalance() {
  //     this.balance = this.totalIncome() - this.totalExpense();
  //     if (this.balance < 0) {
  //       fields.totalBalance.style.color = 'red';
  //     } else {
  //       fields.totalBalance.style.color = 'black';
  //     }
  //     return this.balance
  //   }
  // }

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
    let uniqueId = userIdGenerator();
    let newIncome = {};
    newIncome.description = incomeKey;
    newIncome.amount = incomeValue;
    newIncome.time = incomeTime;
    newIncome.id = uniqueId; 
    this.income.push(newIncome);
    this.accountBalance();
    this.displayIncome(incomeKey, incomeValue, incomeTime)
    putInLocalStorage (this.income, 'incomes');
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
      putInLocalStorage (personAccount.income, 'incomes')
    }
  },
  addExpense: function () {
    let expenseKey = fields.description.value;
    let expenseValue = fields.amount.value;
    let expenseTime = displayDateTime();
    let uniqueId = userIdGenerator();
    let newExpense = {};
    newExpense.description = expenseKey;
    newExpense.amount = expenseValue;
    newExpense.time = expenseTime;
    newExpense.id = uniqueId; 
    this.expense.push(newExpense);
    this.accountBalance();
    this.displayExpense(expenseKey, expenseValue, expenseTime);
    putInLocalStorage (this.expense, 'expenses');
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
      putInLocalStorage (personAccount.expense, 'expenses')
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

function userIdGenerator (){
    var characters = '123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'
       
    var id = '';
    for (i = 0; i < 7; i++){
      var random = Math.floor(Math.random() * 35);
      id = id.concat(characters.charAt(random));
    }    
    return id
  }

  
fields.add.addEventListener('click', onClickRun);
fields.deleteIncome.addEventListener('click', personAccount.deleteAndCalculateIncome);
fields.deleteExpense.addEventListener('click', personAccount.deleteAndCalculateExpense);

function checkLocalStorage (){
  if (personAccount.income.length === 0 && getFromLocalStorage('incomes') !== null){
    let array = getFromLocalStorage('incomes');
    array.forEach(element => { personAccount.income.push(element)});
    personAccount.income.forEach(income => personAccount.displayIncome(income.description, income.amount, income.time))
  }
  
  if (personAccount.expense.length === 0 && getFromLocalStorage('expenses') !== null){
    let array1 = getFromLocalStorage('expenses');
    array1.forEach(element => { personAccount.expense.push(element)});
    personAccount.expense.forEach(expense => personAccount.displayExpense(expense.description, expense.amount, expense.time))
  }
  personAccount.accountBalance();
  fields.totalBalance.textContent = `${personAccount.balance.toString()} €`;
}

checkLocalStorage ()

