// Как да опиша едно събитие ?

// събитие 1 
var eventTitle;
var eventId; // ше бъде последователни случайни символи
var isAdultOnly;

// ще се опитам да пъхна данните за едно събитие - две събития и тн.
var eventCollection = [];
// 0 - eventTitle
// 1 - eventId
// 2 - isAdultOnly

// Как ще получавам данните ?
// Отговор ще ги въвеждам на ръка

// създаваме нова функция която ще ми генерира уникален идентификатор
function generateId() {

    // геренира си случайно число което ще съдържа  количество врътки
    // на даден цикъл. За всяка врътка ще генерирам случайно число и ще го долепям към нова променлива
    var randomGeneratedId = "";
    var numberOfRandomIterations = Math.floor(Math.random() * 50) + 10;
    // while(numberOfRandomIterations > 0) {
    //     randomGeneratedId += Math.floor(Math.random() * 10);
    //     numberOfRandomIterations--;
    // }

    // for(; numberOfRandomIterations > 0; numberOfRandomIterations--) {
    //     randomGeneratedId += Math.floor(Math.random() * 10);
    // }

    for(var iterator = 0; iterator < numberOfRandomIterations; iterator++) {
        randomGeneratedId += Math.floor(Math.random() * 10);
    }



    return randomGeneratedId;
}


function createNewEvent(parameterEventTitle = "Анонимно парти", parameterIsAdultOnly) {

    // присвояване на променливи
    // ** 
    // eventTitle  = parameterEventTitle;
    // eventId     = generateId();
    // isAdultOnly = parameterIsAdultOnly;

    // присвояване в масив
    // ** 
    if(parameterEventTitle) {

        eventCollection[eventCollection.length] = parameterEventTitle;
        eventCollection[eventCollection.length] = generateId();
    
        // Как да кажем че параметер parameterIsAdultOnly има стойност по подразбиране
        eventCollection[eventCollection.length] = parameterIsAdultOnly;
    }
    
}

function listEventCollection() {

    // var eventIterator = 0;
    // while(eventIterator < eventCollection.length) {

    //     var evenTitle   = eventCollection[eventIterator];
    //     var evenId      = eventCollection[eventIterator + 1];
    //     var isAdultOnly = eventCollection[eventIterator + 2];

    //     console.log("Добре дошли на парти със заглавие : ")
    //     console.log(evenTitle)

    //     console.log("Регистрирано като : ")
    //     console.log(evenId)

    //     if(isAdultOnly) {
    //         console.warn("Партито е само за големи");
    //     }
    //     else {
    //         console.log("Партито е за всякакви възрасти");
    //     }

    //     eventIterator += 3
    //     console.log("******");
    // }

    for(var i = 0; i < eventCollection.length; i += 3) {

        // if(eventCollection[i] == null) {
        //     continue;
        // }

        var evenTitle   = eventCollection[i];
        var evenId      = eventCollection[i + 1];
        var isAdultOnly = eventCollection[i + 2];

        console.log(evenTitle)
        console.log(evenId)

        if(isAdultOnly) {
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
        if(eventId == eventCollection[i]) {
            eventIndex = i - 1;
            break;
        }
    }

    // eventCollection[eventIndex      ] = null;
    // eventCollection[eventIndex + 1  ] = null;
    // eventCollection[eventIndex + 2  ] = null;

    eventCollection.splice(eventIndex, 3);
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