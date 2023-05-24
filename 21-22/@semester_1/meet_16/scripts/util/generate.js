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


const nextPrimeNumber = () => {
    return 2;
};

// типична декларация на функция
// const nextId = () => {
//     return currentProductId++;
// }

// едноредова декларация на функция
const nextId = () => currentProductId++

const generateUniqeId = (productTitle = "") => {

    var coeficientA = nextAlphabet();
    var coeficientB = productTitle.length;
    var coeficientC = nextPrimeNumber(); 
    var coeficientD = nextId();

    return `${coeficientA}@${coeficientB}%${coeficientC}^${coeficientD}`;
};