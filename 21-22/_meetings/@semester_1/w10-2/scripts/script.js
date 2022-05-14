const OPERATION_START   = 1;
const OPERATION_BUY     = 2;
const OPERATION_SELL    = 3;
const OPERATION_BRIBE   = 4;
const OPERATION_REPORT  = 5;
const OPERATION_END     = 6;

const tellerManager = function(operationIndex, testObject) {

    // console.log("===============");
    // console.log("Меню с операции");
    // console.log("1. Отваряне на ден");
    // console.log("2. Покупка");
    // console.log("3. Продажба");
    // console.log("4. Рушвет");
    // console.log("5. Справка");
    // console.log("6. Затваряне на ден");

    // const operationIndex = prompt("Моля изберете операция");
    if(operationIndex == 1) return operationStartOfDay(testObject);
    if(operationIndex == 5) return operationReport(testObject);
    if(operationIndex == 6) return operationEndOfDay(testObject);

    if(!OperationManager.isDayStarted()) {
        return console.error("Не можете да извършите операцията");
    }

    if(operationIndex == 2) return operationBuy(testObject);
    if(operationIndex == 3) return operationSell(testObject);
    if(operationIndex == 4) return operationBribe(testObject);
    
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
// tellerManager(OPERATION_START);
// tellerManager(OPERATION_BUY, {
//     category    : "оръжия" ,
//     title       : "воден пистолет",
//     count       : 10,
//     buyPrice    : 50,
//     sellPrice   : 60
// });

// tellerManager(OPERATION_BUY, {
//     category    : "оръжия" ,
//     title       : "водна пушка",
//     count       : 10,
//     buyPrice    : 50,
//     sellPrice   : 60
// });

// tellerManager(OPERATION_BUY, {
//     category    : "оръжия" ,
//     title       : "детски танк",
//     count       : 1,
//     buyPrice    : 10,
//     sellPrice   : 20
// });

// tellerManager(OPERATION_BUY, {
//     category    : "зеленчуци" ,
//     title       : "краставица",
//     count       : 100,
//     buyPrice    : 1,
//     sellPrice   : 3
// });

// tellerManager(OPERATION_SELL);


// let globalVariable = 10;    
// globalVariable = 100;    

// var innerFunction = () => {
//     var globalVariable = 100;
// };

//     {
//         let globalVariable = 10000;
//     }

//  innerFunction();
// console.log(globalVariable); // 10