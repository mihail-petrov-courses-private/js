var isCustomerInterested = confirm("Добре дошли в крипто борса Джунгла, искате ли да си купите малко кинти ?");

if(!isCustomerInterested) {
    alert("Благодаря че НЕпазарувахте при нас, хайде чупката");
}

if(isCustomerInterested) {

    var customerBudget = 100;

    alert("На вашето внимание актуални валути: Criptomaza, Sharo, Bitcat, eTorium, Tiger");

    // граничен случай на задачата
    // Какво става ако въведен несъществуваща валута ?
    var currencyPrice   = 0;
    var currencyId      = prompt("Моля изберете валута");
    if(currencyId == "Criptomaza") {
        currencyPrice = 10;
    }

    if(currencyId == "Sharo") {
        currencyPrice = 0.5;
    }

    if(currencyId == "Bitcat") {
        currencyPrice = 100000;
    }

    if(currencyId == "eTorium") {
        currencyPrice = 2;
    }    

    if(currencyId == "Tiger") {
        currencyPrice = 50;
    }

    var isCustomerReadyToOrder = (currencyPrice > 0)
    if(isCustomerReadyToOrder) {
    // if(isCustomerReadyToOrder) {
     
        var currencyCount       = prompt("Моля изберете количеството");
        var transactionPrice    = currencyPrice * currencyCount; // 1 
        // Имам ли достатъчно парички
        var isTransactionPosible =  transactionPrice <= customerBudget;
    
        if(isTransactionPosible) {
            
            var restPrice = customerBudget - transactionPrice;
            var stringConcatenationMessage = "Вие станахте горд собственик на " +  currencyCount + 
                                                " единици от валутата " + currencyId + 
                                                " покупката ви струваше "  + transactionPrice + 
                                                " рестото ви е" + restPrice;
    
            var stringTemplateMessage       = `Вие станахте горд собственик на ${currencyCount} единици от валутата ${currencyId} покупката ви струваше ${transactionPrice} рестото ви е ${restPrice}`;
    
            alert(stringTemplateMessage);
    
    
            var doesCustomerWhantToSeeTheBlanse = confirm("Ти си вече по-богат искаш ли да ти покажа колко много парички имаш");
    
    
            if(doesCustomerWhantToSeeTheBlanse) {
                alert(`Ти имаш точно ${currencyCount} единици от валутата ${currencyId} на стойност ${transactionPrice}`);
    
                alert(`За мен беше удоволствие че избрахте нашия магазин до нови срещи`);
            }
            else {
                alert(`Ти губиш, хайде да си ходиш`);
            }
        }
        else {
            alert("Много си алчен, няма място за теб в моя магазин. Сбогом");
        }
    }
    else {
        alert("Валутата е невалидна, моля изберете нова");
    }
}