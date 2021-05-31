var eventCollection = [];

const generateId = function() {

    var randomGeneratedId = "";
    var numberOfRandomIterations = Math.floor(Math.random() * 50) + 10;

    for(var iterator = 0; iterator < numberOfRandomIterations; iterator++) {
        randomGeneratedId += Math.floor(Math.random() * 10);
    }

    return randomGeneratedId;
}


const createNewEvent = function(parameterEventTitle = "Анонимно парти", parameterIsAdultOnly) {

    if(parameterEventTitle) {

        eventCollection[eventCollection.length] = {
            eventTitle      : parameterEventTitle,
            eventId         : generateId(),
            isAdoultOnly    : parameterIsAdultOnly,

            // създавам нов ключ, който ще съдържа в себе си функция
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
    }
}

const listEventCollection = function() {

    for(var i = 0; i < eventCollection.length; i ++) {

        var event = eventCollection[i]; 
        event.getEventInfo();
    }
}

const removeEventById = function(eventId) {

    var eventIndex = 0;
    for(var i = 0; i < eventCollection.length; i++) {

        var event = eventCollection[i];

        if(eventId == event.eventId) {
            eventCollection.splice(i, 1);
            break;
        }
    }   
}

createNewEvent(                         );
createNewEvent("вход свободен"          );
createNewEvent("черно парти"    , true  );
createNewEvent("чалта парти"    , true  );
createNewEvent("ретро парти"    , true  );
createNewEvent("детско парти"   , false );
listEventCollection();


// Къде ще съхранявам данните за едно събитие ?
// Къде ще съхранявам данните за всички събития ?