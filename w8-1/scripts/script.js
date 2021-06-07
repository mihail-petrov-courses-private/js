const OPERATION_START   = 1;
const OPERATION_BUY     = 2;
const OPERATION_SELL    = 3;
const OPERATION_BRIBE   = 4;
const OPERATION_REPORT  = 5;
const OPERATION_END     = 6;


const tellerManager = function(operationIndex) {

    console.log("===============");
    console.log("Меню с операции");
    console.log("1. Отваряне на ден");
    console.log("2. Покупка");
    console.log("3. Продажба");
    console.log("4. Рушвет");
    console.log("5. Справка");
    console.log("6. Затваряне на ден");

    // const operationIndex = prompt("Моля изберете операция");
    if(operationIndex == 1) return operationStartOfDay();
    if(operationIndex == 5) return operationReport();
    if(operationIndex == 6) return operationEndOfDay();

    if(!isOperationProcessable()) {
        return console.error("Не можете да извършите операцията");
    }

    if(operationIndex == 2) return operationBuy();
    if(operationIndex == 3) return operationSell();
    if(operationIndex == 4) return operationBribe();
    
    alert("Апарата не поддържа избраната операция");
};

// while(true) {
//     tellerManager();
// }

// Тестов сценарии отваряне на ден
// # ====
// tellerManager(OPERATION_START);
// tellerManager(OPERATION_START);

// #Затваряне на ден
// # ====
// tellerManager(OPERATION_START); // отваряне
// tellerManager(OPERATION_END); // затваряне
// tellerManager(OPERATION_START); // отваряне
// tellerManager(OPERATION_END); // затваряне
// tellerManager(OPERATION_END); // затваряне

// #Ползване на непозволени операции преди отворен ден
// # ====
// tellerManager(OPERATION_BUY);
// tellerManager(OPERATION_SELL);
// tellerManager(OPERATION_BRIBE);
// tellerManager(OPERATION_REPORT);


// #Покупка на стока
// # ====
tellerManager(OPERATION_START);
tellerManager(OPERATION_BUY);