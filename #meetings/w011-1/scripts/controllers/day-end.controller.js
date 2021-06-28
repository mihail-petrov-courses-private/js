const operationEndOfDay = function() {

    if(isDayStarted) {

        isDayStarted = false;
        return console.log("Деня е приключен успешно");
    }

    console.error("Не сте стартирали деня си, моля направете го преди да го затворите");
};