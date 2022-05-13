var currentAlphabet     = -1;
var alphabetCollection  = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
var currentPrimeNumber  = 2;
var currentProductId    = 1;

const generateSecretTradingCode = () => {

    var operationCountSign  = (yesterdayOperationCount  == 0    ) ? "#@" : yesterdayOperationCount;
    var sellCountSign       = (yesterdaySellCount       == 0    ) ? "**" : yesterdaySellCount;
    var profitSign          = (yesterdayProffit         <= 0    ) ? "00" : yesterdayProffit;
    return `${operationCountSign}$$${sellCountSign}%%${profitSign}`;
};

// Ламбда функция
const nextAlphabet = () => {
    
    if(currentAlphabet == alphabetCollection.length - 1) {
        currentAlphabet = -1; 
    }

    return alphabetCollection[++currentAlphabet];
};


const isPrimeNumber = (numberCandidate) => {

    for(var i = 2; i < numberCandidate; i++) {
        if(numberCandidate % i == 0 ) return false;
    }

    return true;
};

const nextPrimeNumber = () => {
    
    // от къде започвам да изследвам простите числа
    while(true) {

        if(isPrimeNumber(currentPrimeNumber)) {
            
            // # елегантен вариант
            return currentPrimeNumber++;

            // # дълъг вариант
            // var returnedPrimeNumber = currentPrimeNumber;
            // currentPrimeNumber++;
            // return returnedPrimeNumber;
        }

        currentPrimeNumber++;
    }
};

// едноредова декларация на функция
const nextId = () => currentProductId++

const generateUniqeId = (productTitle = "") => {

    var coeficientA = nextAlphabet();
    var coeficientB = productTitle.length;
    var coeficientC = nextPrimeNumber(); 
    var coeficientD = nextId();

    return `${coeficientA}@${coeficientB}%${coeficientC}^${coeficientD}`;
};