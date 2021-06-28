const OperationManager = (() => {

    let isDayStartedStatus          = false;
    let currentSecretTradingCode    = null;
    const PublicReference           = {}



    PublicReference.isDayStarted = () => {
        return isDayStartedStatus;
    };

    PublicReference.getSecretTradingCode = () => {
        return currentSecretTradingCode;
    };

    PublicReference.startDay = () => {

        isDayStartedStatus          = true;
        currentSecretTradingCode    = generateSecretTradingCode();
        return currentSecretTradingCode;
    };

    PublicReference.endDay = () => {
        isDayStartedStatus          = false;
        currentSecretTradingCode    = null;
    };

    PublicReference.isTradingCodeValid = (inputTradingCode) => {
        return currentSecretTradingCode == inputTradingCode;
    };

    return PublicReference;
})();