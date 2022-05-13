var yesterdayOperationCount = 0;
var yesterdaySellCount      = 0;
var yesterdayProffit        = 0;

const operationStartOfDay = function() {

    if(OperationManager.isDayStarted()) {
        return console.error("Деня вече е стартиран, приятни продажби")
    }

    let currentSecretTradingCode =  OperationManager.startDay();
    console.log(`Деня е стартиран успешно ${currentSecretTradingCode}`);
};