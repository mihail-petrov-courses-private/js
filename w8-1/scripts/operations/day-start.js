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
    console.log("Деня е стартиран успешно");
    currentSecretTradingCode = generateSecretTradingCode();
};

const generateSecretTradingCode = function() {

    var operationCountSign  = (yesterdayOperationCount  == 0    ) ? "#@" : yesterdayOperationCount;
    var sellCountSign       = (yesterdaySellCount       == 0    ) ? "**" : yesterdaySellCount;
    var profitSign          = (yesterdayProffit         <= 0    ) ? "00" : yesterdayProffit;
    return `${operationCountSign}$$${sellCountSign}%%${profitSign}`;
};

const isTradingCodeValid = function(inputTradingCode) {
    return currentSecretTradingCode == inputTradingCode;
};