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
    let description = fields.description.value;
    let amount = fields.amount.value;
    let time = displayDateTime();
    let id = userIdGenerator();
    let newIncome = {description, amount, time, id};
    what.push(newIncome);
    this.accountBalance();
    if (name === 'income') {
      display(fields.income, description, amount, time)
    } else {
      display(fields.expense, description, amount, time);
    }
    putInLocalStorage(what, name + 's');
  },
  delete(field, what) {
    if (confirm('Are you sure you want to delete last entry?') === true) {
      what.splice(-1, 1);
      field.innerHTML = '';
      for (let item of what) {
        display(field, item.description, item.amount, item.time)
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
    fields.totalBalance.textContent = `${this.balance.toString()} €`;
    return this.balance
  }
}

function addIncomeOrExpense() {
  if (fields.transactionType.value === 'income') {
    personAccount.add(personAccount.income, 'income');
  } else {
    personAccount.add(personAccount.expense, 'expense');
  }
}

function display(field, key, value, time) {
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
  if (field === fields.expense) {
    onlyAmount.innerHTML = '-' + value + ' €';
  } else {
    onlyAmount.innerHTML = value + ' €';
  }
  fields.totalIncome.textContent = personAccount.total(personAccount.income) + ' €';
  fields.totalExpense.textContent = '-' + personAccount.total(personAccount.expense) + ' €';
}

function validation() {
  if (fields.description.value && fields.amount.value && isFinite(fields.amount.value)) {
    fields.warning.style.bottom = '2000px';
    fields.description.removeAttribute('class', 'attention');
    fields.amount.removeAttribute('class', 'attention');
    addIncomeOrExpense()
    fields.description.value = '';
    fields.amount.value = '';
  } else {
    fields.description.className = 'attention';
    fields.amount.className = 'attention';
    fields.warning.style.bottom = '-20px';
    fields.description.value = '';
    fields.amount.value = '';
  }
  personAccount.accountBalance();
}

fields.add.addEventListener('click', validation);
fields.deleteIncome.addEventListener('click', () => {personAccount.delete(fields.income, personAccount.income)
});
fields.deleteExpense.addEventListener('click', () => {
  personAccount.delete(fields.expense, personAccount.expense)
});


function checkLocalStorage(what, local, field) {
  if (getFromLocalStorage('incomes') && getFromLocalStorage('expenses')) {
      let array = getFromLocalStorage(local);
      array.forEach(element => {
        what.push(element)
      });
      what.forEach(item => display(field, item.description, item.amount, item.time))
      personAccount.accountBalance();
      fields.totalBalance.textContent = `${personAccount.balance.toString()} €`;
    }
  } 

checkLocalStorage(personAccount.income, 'incomes', fields.income);
checkLocalStorage(personAccount.expense, 'expenses', fields.expense);