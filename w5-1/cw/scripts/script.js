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

// Как да преброим цифрите

// #Вариант с числа
// точно 6 цифри     - > NORMAL 100000 - 999999
// var isCustomerNormal =  (customerNumber >= 100000) && 
//                         (customerNumber <= 999999);

// #Вариант с употребата на свойството .length
var isCustomerNormal =  customerNumber.length == NORMAL_CUSTOMER_NUMBER_LENGTH;

// #Вариант с числа
// повече от 6 цифри - > LAGGER
// var isCustomerLagger = customerNumber > 999999;

// #Вариант с употребата на свойството .length
var isCustomerLagger = customerNumber.length > NORMAL_CUSTOMER_NUMBER_LENGTH;


// повече от 2 цифри - > EARLRY_ADOPTER customerNumber > 99

// # вариант с няколко логически оператора && + инверсия
// var isCustomerEarlyAdopter = (customerNumber > 99) && 
//                              !isCustomerLagger     && 
//                              !isCustomerNormal;

// # вариант с числа
// var isCustomerEarlyAdopter      = (customerNumber > 99) &&
//                                   (customerNumber < 100000);

// #Вариант с употребата на свойството .length                        
var isCustomerEarlyAdopter      = customerNumber.length > EARLY_ADOPTER_CUSTOMER_NUMBER_LENGTH &&
                                  customerNumber.length < NORMAL_CUSTOMER_NUMBER_LENGTH;

console.log(`потребителя е EARLRY_ADOPTER ${isCustomerEarlyAdopter}`);
console.log(`потребителя е NORMAL ${isCustomerNormal}`);
console.log(`потребителя е LAGGER ${isCustomerLagger}`);
console.log("=====")
console.log(customerNumber.length);

