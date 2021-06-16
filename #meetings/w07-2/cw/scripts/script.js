// създаване на потребители
const customer = createNewCustomer({
    firstName   : "Mihail", 
    lastName    : "Petrov", 
    sex         : SexEnum.MALE, 
    age         : 29
});
registerNewCustomer(customer);

const invalidCustomer = createNewCustomer();
registerNewCustomer(invalidCustomer);


// създаване на събития
// createNewEvent(                         );
// createNewEvent("вход свободен"          );
// createNewEvent("черно парти"    , true  );
// createNewEvent("чалта парти"    , true  );
// createNewEvent("ретро парти"    , true  );
// createNewEvent("детско парти"   , false );
var eventId = createNewEvent({
    eventTitle: "частно мега парти"
});
addCustomerToEvent(eventId, createNewCustomer({
    firstName   : "Mihail"  , 
    lastName    : "Petrov", 
    sex         : SexEnum.MALE, 
    age         : 29
}));
addCustomerToEvent(eventId, createNewCustomer({
    firstName   : "Ivana"  , 
    lastName    : "Ivanova", 
    sex         : SexEnum.FEMALE, 
    age         : 32
}));
addCustomerToEvent(eventId, createNewCustomer({
    firstName   : "Marija"  , 
    lastName    : "Stankova", 
    sex         : SexEnum.FEMALE, 
    age         : 24
}));

var myEvent = getEventById(eventId);
myEvent.listAllCustomers();

// listEventCollection();


// Къде ще съхранявам данните за едно събитие ?
// Къде ще съхранявам данните за всички събития ?