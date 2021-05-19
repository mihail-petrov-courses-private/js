// команди - функциии за визуализация на съобщения
// alert
// confirm
// prompt
// console.log()
// Разликата е в цвета на съобщението
// console.log("Това е съобщение в конзолата");
// console.warn("Това е предупредително съобщение");
// console.error("Това е грешка");

// не правилен начин за деклариране на константа
// const normalCustomerNumberLength = 6;

const EARLY_ADOPTER_CUSTOMER_NUMBER_LENGTH = 2;
const NORMAL_CUSTOMER_NUMBER_LENGTH = 6;


var customerNumber = prompt("Моля въведете вашия клиентски номер");

var isCustomerNormal        =   customerNumber.length == NORMAL_CUSTOMER_NUMBER_LENGTH;

var isCustomerLagger        =   customerNumber.length > NORMAL_CUSTOMER_NUMBER_LENGTH;

var isCustomerEarlyAdopter  =   customerNumber.length > EARLY_ADOPTER_CUSTOMER_NUMBER_LENGTH &&
                                customerNumber.length < NORMAL_CUSTOMER_NUMBER_LENGTH;

console.log(`потребителя е EARLRY_ADOPTER ${isCustomerEarlyAdopter}`);
console.log(`потребителя е NORMAL ${isCustomerNormal}`);
console.log(`потребителя е LAGGER ${isCustomerLagger}`);
console.log("=====")

// ВИП е клиент с четен клиентски номер
var isCustomerVIP  = ((customerNumber % 2) == 0);

// # Взимане на пред последно число с помоща на мат. операции върху числа
// взимаме пред последна цифра на номера на клиента
// взимаме остатъка от остатъчното деле [%]
var getLastDigitPare = customerNumber % 100;

// ще направим деле на последните две цифри за да получим цяла и дробна част
var getLastDigitPareWithPeriod = getLastDigitPare / 10;

// взимаме само и единствено цяла част от дробта
// ползваме функция за премахване на дробната част от цялата част parseInt
var getFirstNumberFromLastDigitPareWithPeriod = parseInt(getLastDigitPareWithPeriod);


// # Взимане на пред последно число с помоща на НИЗОВИ операции
// ще ползваме свойство .length
// ще вземем броя на всички символи в клиентския номер
var totalCountOfChars = customerNumber.length;
// ще вземем точния индекс на пред последния символ
// totalCountOfChars - 1 ==> взимаме последния
// totalCountOfChars - 2 ==> взимаме пред последния
var nextToLastIndex = totalCountOfChars - 2;

// ще използваме индексатора за да достъпим конкретен елемент
var getNextToLastNumber  = customerNumber[nextToLastIndex];

var canCustomerHaveExtraMeal = (getNextToLastNumber > 3);
var isCustomerSuperVIP       = isCustomerVIP && canCustomerHaveExtraMeal;

// искаме ли да продължим с изпълнението на поръчката на потребителя
// искаме - затова казваме true
var shoulContinueWithCustomerOrder = true;
var orderPrice  = 0;


var orderHistory = "";


// колекция - масив от всички поръчки които съм направил в системата
// създаваме нов масив като на променлива присвояваме литерал за масив.
var orderHistoryCollection = []; // 

// искаме да повтаряме изпълнението на менюото до като не приключим поръчката
// сменям IF с WHILE
while(shoulContinueWithCustomerOrder) {

    // изтрива конзолата, от всякакъв текст
    console.clear();
    console.log("Меню:"                 );
    console.log("1. Паржола - 10"       );
    console.log("2. Салатка - 5"        );
    console.log("3. Крем Карамел - 4.8" );

    
    var orderNumber = prompt("Какво ще ядем ?");

    if(orderNumber == 1) {
        orderPrice += 10;
        console.log("Вие си избрахте да хапвате Пържола");
        orderHistoryCollection[orderHistoryCollection.length] = "Пържола";
    }

    if(orderNumber == 2) {
        orderPrice += 5;
        console.log("Вие си избрахте да хапвате Салата");
        orderHistoryCollection[orderHistoryCollection.length] = "Салата";
    }

    if(orderNumber == 3) {
        orderPrice += 4.8;
        console.log("Вие си избрахте да хапвате крем карамел");
        orderHistoryCollection[orderHistoryCollection.length] = "Крем карамел";
    }

    shoulContinueWithCustomerOrder = confirm("Искате ли да продължите да поръчвате ?")
}

// алтернативен начин за връщане на стойност базирана на идеята за IF / ELSE
var discount = (isCustomerVIP) ? 5 : 1;

console.log(`Вие имате отчетена отстъпка от : ${discount}`);
// извежда се след края на поръчката
console.log(`Вашата поръчка е на стойност: ${orderPrice - discount}`);

console.log(`Вие си поръчахте следните неща:`);
// console.log(orderHistoryCollection);

// докато имам елементи в моята колекция 
// * искам да ми извеждаш на екрана поръчките ми

// какъв е интервала на моят масив тоест от колко до колко са елементите (колко са индексите)
// * винаги почваме от 0
// * винаги свършваме в collection.length

var currentIndex = 0;

// мога да покажа каква поръчка съм направил само ако в момента индекса ми е по малкък
// от максималния индекс в колекцията
// *** или иначе казано въртим
// докато текущия индекс е по-малък от максималния в колекцията
while(currentIndex < orderHistoryCollection.length) {
    console.log(`Аз си поръчах ${orderHistoryCollection[currentIndex]}`);

    // присвояване
    // currentIndex = currentIndex + 1;
    
    // компактно присвояване
    //currentIndex += 1;

    // едностъпкова инкрементация
    currentIndex++;
}



