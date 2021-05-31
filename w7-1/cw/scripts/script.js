var eventCollection     = [];
var vipEventCollection  = []; 

const generateId = function() {

    var randomGeneratedId = "";
    var numberOfRandomIterations = Math.floor(Math.random() * 50) + 10;

    for(var iterator = 0; iterator < numberOfRandomIterations; iterator++) {
        randomGeneratedId += Math.floor(Math.random() * 10);
    }

    return randomGeneratedId;
}


const createNewEvent = function(parameterEventTitle     = "Анонимно парти", 
                                parameterIsAdultOnly    = false, 
                                parameterIsVip          = false) {

    if(parameterEventTitle) {

        var newEvent = {
            eventIndex      : eventCollection.length,
            isVip           : parameterIsVip,
            eventTitle      : parameterEventTitle,
            eventId         : generateId(),
            isAdoultOnly    : parameterIsAdultOnly,

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
            }
        };

        eventCollection[eventCollection.length] = newEvent;
        if(parameterIsVip) {
            vipEventCollection[vipEventCollection.length] = newEvent;
        }
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

    // стария код с повторения и цикли
    // for(var i = 0; i < eventCollection.length; i++) {

    //     var event = eventCollection[i];
    //     if(eventId == event.eventId) {
    //         eventCollection.splice(i, 1);
    //         break;
    //     }
    // }   

    // компактна версия разчитаща на функцията getEventById
    var event = getEventById(eventId);
    eventCollection.splice(event.eventId, 1);
};


const updateEvent = function(eventId, title, isAdoultOnly) {

    var event = getEventById(eventId);
    event.eventTitle    = title;
    event.isAdoultOnly  = isAdoultOnly;
};

createNewEvent(                         );
createNewEvent("вход свободен"          );
createNewEvent("черно парти"    , true  );
createNewEvent("чалта парти"    , true  );
createNewEvent("ретро парти"    , true  );
createNewEvent("детско парти"   , false );
createNewEvent("частно мега гега парти"   , false , true);
listEventCollection();


// Къде ще съхранявам данните за едно събитие ?
// Къде ще съхранявам данните за всички събития ?