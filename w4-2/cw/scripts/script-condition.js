// оператори за сравнение
// >
// <
// ==  - сравнение за равенство
// !=  - сравнение за различност

// >=  - по - голямо или равно
// <=  - по - малко или рамно

// оператори за логика
// бинарни оператори 
// && - логическо И   - AND
// || - логическо ИЛИ - OR
// унарен оператор
// !  - 

// аритметични оператори
// + 
// -  
// *  - умножение
// /  - връща цялата част при делене на две числа
// %  - връща остъка от деле на две числа

var priceDiscount   = 0;
var stockCount      = 0;
var totalStockCount = 0;

// Поздравителен адрес
var welcomeMessage = "Добре си ми дошъл в цветовия конфигуратор"; // инициализация
alert(welcomeMessage);

welcomeMessage = "Имаш шанс да избереш любимия си цвят за стаята на мечтите ти";
alert(welcomeMessage);


// Проверка за възраста на потребителя
var customerAge = prompt("На колко години си в момента");

// var isCustomerChild  = customerAge < 18;
var isCustomerAdoult    = customerAge >= 18; 

// if (isCustomerChild) { // false
//     alert("Магазина е само за пълнолетни, махай се");
// }

if(!isCustomerAdoult) { // ако НЕ СЪМ вързастен само тогава ще се изпълни
    alert("Магазина е само за пълнолетни, махай се");
}


// това е варианта на нашата програма
// която ще обслужва всички потребители
if(isCustomerAdoult) {
// if(customerAge >= 18) {
// if (customerAge > 18 || customerAge == 18) { // 

    // булевите променливи трябва да започват с въпросителна частица
    // * has
    // * is
    // * should
    // * have
    // * does
    var isCustomerAlreadyBuySomething = confirm("Пазарувал ли си от мен преди");

    // клиента ми е клиент отдавна
    if (isCustomerAlreadyBuySomething) {
        totalStockCount      = prompt("Какво количество стоки си закупил за последния месец");
    }

    // клиента не е купил нищо от мен досега
    if (isCustomerAlreadyBuySomething == false) {
        alert("Добре дошъл нов клиентино !!!! Посрещам с хляб и сол");
    }


    var posibleColorMessage = "Имаме в наличност следните цветове: червен, жълт, син, зелен";
    alert(posibleColorMessage);

    var questionMessage = "Какъв е любими ти цвят ?";
    var color = prompt(questionMessage);
    var isColorAvailable =  (color == "червен") || 
                            (color == "зелен")  || 
                            (color == "син")    || 
                            (color == "жълт");

    var colorCode; // undefined

    // IF [УСЛОВЕН ИЗРАЗ]
    // ELSE (само ако IF не се изпълни)
    if(isColorAvailable) { // false

        // червен   - #ff0000
        if(color == "червен") {
            colorCode = "#ff0000";
        }
        // зелен    - #00ff00
        else if(color == "зелен") {
            colorCode = "#00ff00";
        }    
        // син      - #0000ff
        else if(color == "син") {
            colorCode = "#0000ff";
        }        
        // жъл      - #00ffff
        else if(color == "жълт") {
            colorCode = "#00ffff";
        }        
    }
    else { // влизаме тук
        colorCode = "#000000";
    }

    var isDiscountable      =   isCustomerAlreadyBuySomething   && 
                                totalStockCount > 5             && 
                                stockCount      >= 1;

    if(isDiscountable) {
        alert("Ти си класиран за дебелата отстъпка от 10 лв, Честито");
    }
}
else {
    alert("Магазина е само за пълнолетни, махай се");
}