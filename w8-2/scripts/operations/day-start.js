var isDayStarted        = false;
var secretTradingCode   = "";

var yesterdayOperationCount = 0;
var yesterdaySellCount      = 0;
var yesterdayProffit        = 0;


var currentSecretTradingCode = null;

const operationStartOfDay = function() {

    if(isDayStarted) {
        return console.error("Деня вече е стартиран, приятни продажби")
    }

    isDayStarted = true;
    
    currentSecretTradingCode = generateSecretTradingCode();
    console.log(`Деня е стартиран успешно ${currentSecretTradingCode}`);
};


const isTradingCodeValid = function(inputTradingCode) {
    return currentSecretTradingCode == inputTradingCode;
};