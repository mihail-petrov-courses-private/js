var eventCollection = [];

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

        // създаваме нов обект, който да съдържа данни за събитието
        var newEventData             = {};
        newEventData['eventTitle']   = parameterEventTitle;
        newEventData['eventId']      = generateId();
        newEventData['isAdoultOnly'] = parameterIsAdultOnly;

        // добавяне на събитието към списъка със събития
        eventCollection[eventCollection.length] = newEventData;
    }
}

function listEventCollection() {

    for(var i = 0; i < eventCollection.length; i ++) {

        var event = eventCollection[i]; 

        console.log(event.eventTitle)
        console.log(event.eventId)

        if(event.isAdoultOnly) {
            console.warn("Партито е само за големи");
        }
        else {
            console.log("Партито е за всякакви възрасти");
        }

        console.log("===");
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