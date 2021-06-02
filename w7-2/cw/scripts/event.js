var eventCollection     = [];
var vipEventCollection  = []; 


const createNewEvent = function(configObject) {
    
    var parameterIsVip          = configObject.isVip; // false
    var parameterEventTitle     = configObject.eventTitle; // "Анонимно парти"
    var parameterIsAdultOnly    = configObject.isAdoultOnly; // false

    if(parameterEventTitle) {

        var newEvent = {
            eventIndex      : eventCollection.length,
            isVip           : parameterIsVip,
            eventTitle      : parameterEventTitle,
            eventId         : generateId(),
            isAdoultOnly    : parameterIsAdultOnly,

            // празен масив, който ще съдържа всички клиенти
            // които са заявили желание за това събитие.
            customerCollection : [],

            getEventInfo    : function() {

                console.log(this.eventTitle)
                console.log(this.eventId)

                if(this.isAdoultOnly) {
                    console.warn("Партито е само за големи");
                }
                else {
                    console.log("Партито е за всякакви възрасти");
                }
        
                console.log("===");
            },

            addCustomer(customer) {
                this.customerCollection.push(customer);
            },

            listAllCustomers() {

                console.log(`$ Регистрирани потребители:`);
                for(var i = 0; i < this.customerCollection.length; i++) {
                    var customer = this.customerCollection[i];
                    console.log(`>> ${customer.getFullName()}`);
                }
            }
        };

        // eventCollection[eventCollection.length] = newEvent;
        eventCollection.push(newEvent);
        if(parameterIsVip) {
            // vipEventCollection[vipEventCollection.length] = newEvent;
            vipEventCollection.push(newEvent);
        }

        return newEvent.eventId;
    }
}

const getEventById = function(eventId) {

    for(var i = 0; i < eventCollection.length; i++) {

        if(eventId == eventCollection[i].eventId) {
            return eventCollection[i];
        }
    }
};

const listEventCollection = function() {

    for(var i = 0; i < eventCollection.length; i ++) {

        var event = eventCollection[i]; 
        event.getEventInfo();
    }
};

const removeEventById = function(eventId) {
    var event = getEventById(eventId);
    eventCollection.splice(event.eventId, 1);
};


const updateEvent = function(eventId, title, isAdoultOnly) {

    var event = getEventById(eventId);
    event.eventTitle    = title;
    event.isAdoultOnly  = isAdoultOnly;
};


const addCustomerToEvent = function(eventId, customer) {

    // взимаме събитието към което ще добавим потребителя
    var event = getEventById(eventId);
    event.addCustomer(customer);
}