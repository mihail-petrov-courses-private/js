var eventCollection = [];

var functionVariable = function sampleFunction() {
    console.log("This is very strange");
}

function generateId() {

    var randomGeneratedId = "";
    var numberOfRandomIterations = Math.floor(Math.random() * 50) + 10;

    for(var iterator = 0; iterator < numberOfRandomIterations; iterator++) {
        randomGeneratedId += Math.floor(Math.random() * 10);
    }

    return randomGeneratedId;
}


function createNewEvent(parameterEventTitle = "Анонимно парти", parameterIsAdultOnly) {

    if(parameterEventTitle) {

        var newEvent = {
            eventTitle      : parameterEventTitle,
            eventId         : generateId(),
            isAdoultOnly    : parameterIsAdultOnly,

            // създавам нов ключ, който ще съдържа в себе си функция
            getEventInfo    : function getEventInfo() {
                console.log(newEvent.eventTitle)
                console.log(newEvent.eventId)
        
                if(newEvent.isAdoultOnly) {
                    console.warn("Партито е само за големи");
                }
                else {
                    console.log("Партито е за всякакви възрасти");
                }
        
                console.log("===");
            }
        };

        eventCollection[eventCollection.length] = newEvent;
    }
}

function listEventCollection() {

    for(var i = 0; i < eventCollection.length; i ++) {

        var event = eventCollection[i]; 
        event.getEventInfo();
    }
}

function removeEventById(eventId) {

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