var customerCollection = [];


// функция която да ни конструира нов обект
// фабрика - за обекти.
const createNewCustomer = function(configObject) {

    // взимане на дифолтен обект част 1
    // var configObject= (configObject) ? configObject : {};

    // взимане на дифолтен обект част 2
    var configObject = configObject || {};

    var firstName   = configObject.firstName;
    var lastName    = configObject.lastName;
    var sex         = configObject.sex;
    var age         = configObject.age;

    return {
        firstName   : firstName,
        lastName    : lastName,
        sex         : sex,
        age         : age,
    
        // класически вариант за запис на функции 
        // намиращи се в рамките на един обект
        getFullName : function() {
            return `${this.firstName} ${this.lastName}`;
        },
    
        // модерен подход за запис на функции в обекти
        getFullNameModern() {
            return `${this.firstName} ${this.lastName}`;
        }
    };
};


const registerNewCustomer = function(customer) {

    // ако стойността на firstName != undefined
    if(!customer.firstName) {
        return console.error("Моля въведете първо име на клиента");
    }

    if(!customer.lastName) {
        return console.error("Моля въведете фамилно име");
    }

    if(!SexEnum.isValid(customer.sex)) {
        return console.error("Моля въведете коректен пол");     
    }

    if(!customer.age || customer.age < 12) {
        return console.error("Клиента не е достатъчно възрастен");     
    }

    // добавяне на елемент към края на масива 
    customer.id = generateId();
    customerCollection.push(customer);
    console.info("Успешно добавихте нов потребител");
};