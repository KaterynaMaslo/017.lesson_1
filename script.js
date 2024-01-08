const userData = {
    'USD': 1000,
    'EUR': 900,
    'UAH': 15000,
    'BIF': 20000,
    'AOA': 100
  };
  
const bankData = {
    'USD': {
        max: 3000,
        min: 100,
        img: '💵'
    },
    'EUR': {
        max: 1000,
        min: 50,
        img: '💶'
    },
    'UAH': {
        max: 0,
        min: 0,
        img: '💴'
    },
    'GBP': {
        max: 10000,
        min: 100,
        img: '💷'
    }
};

function displayBalance() {
    let currency = prompt('Enter currency for balance display(USD, EUR, UAH, GBP):');
    if (currency == null){
        console.log('The operation was cancelled');
        return;
    }
    currency=currency.toUpperCase();

    if (userData.hasOwnProperty(currency)) {
        console.log(`Balance is: ${userData[currency]} ${currency} ${bankData[currency].img}`);
        return;
    } 
    else {
        console.log('Invalid currency. Please enter a valid currency.');
        displayBalance();
    }
}

function getMoney (userData, bankData){
    return new Promise((resolve, reject)=>{
        const viewBalanceConfirm = confirm('View card balance?');
        viewBalanceConfirm ? resolve(userData) : reject({userData: userData, bankData: bankData});
    })
    .then ((userData) => displayBalance())
    .catch(({ userData, bankData }) => {
        let currency, amount;
        do {
            currency = prompt('Enter currency for withdrawal(USD, EUR, UAH, GBP):').toUpperCase();
        } while (!userData[currency] || !bankData[currency] || bankData[currency].max === 0);

        do {
            amount = parseFloat(prompt(`Enter amount to withdraw (between ${bankData[currency].min} and ${bankData[currency].max}):`));
        } while (isNaN(amount) || amount < bankData[currency].min || amount > bankData[currency].max);

        if (amount <= userData[currency]) {
            userData[currency] -= amount;
            console.log(`Here are your cash ${amount} ${currency} ${bankData[currency].img}`);
        } console.log('Insufficient funds for withdrawal.');
    })
    .finally(() => {
        console.log('Thank you, have a nice day 😊');
      });
}

getMoney(userData, bankData);
