// Робота има нужда от система за навигация, трябва да получава входни данни какъв е типът на обекта който се намира пред него, стена, стол или нищо. Ако пред него има стена, то той трябва да се обърне на ляво или на дясно. Ако пред него има стол то той трябва да го прескочи ако няма нищо трябва да продължи напред. Програмата на робота трябва да приеме входните данни и да му даде команда Forward / Jump / Go Sideway

const COMAND__GO_SIDEWAY    = "Go Sideway";
const COMAND__JUMP          = "Jump";
const COMAND__FORWARD       = "Forward";

const OBJECT__WALL          = "стена";
const OBJECT__CHAIR         = "стол";
const OBJECT__EMPTY         = "нищо";

const MAX_NUMBER_OF_HIT     = 4;


const RANDOM_MIN            = 1;
const RANDOM_MAX            = 10;

const RANDOM_PHASE_EMITER__MIN = 1;
const RANDOM_PHASE_EMITER__MAX = 1000;

var enverinmentInput = prompt("Какъв е обекта пред нас?");
enverinmentInput = enverinmentInput.toLowerCase();
var directionCommand;

if(enverinmentInput == OBJECT__WALL) {
    directionCommand = COMAND__GO_SIDEWAY;
}

if(enverinmentInput == OBJECT__CHAIR) {
    directionCommand = COMAND__JUMP;
}

if(enverinmentInput == OBJECT__EMPTY) {
    directionCommand = COMAND__FORWARD;
}

console.log(directionCommand);

// създаваме си общи променливи за програмата
var numberOfHitsUntilNow    = 0;


function getRandomNumberBetweenMinAndMax(min, max) {

    var randomNumber        = Math.random() * (max - min) + min;
    randomNumber            = Math.floor(randomNumber);
    return randomNumber;
}

function hasEnergy() {
    return numberOfHitsUntilNow < MAX_NUMBER_OF_HIT;
}

// създаваме си един общ цикъл който ще върти програмата до безкрай
while(true) {

    // #1. проверка за намерена цел
    var environmentInputPixels = prompt("Моля въведете броя на пикселите наоколо ? ");
    var isTargetDetected       = environmentInputPixels % 2 == 0;

    // #2. проверка за заредена батерия
    
    var isBatteryFull           = hasEnergy();

    // #3. проверка за деликатен удар
    var randomNumber        = getRandomNumberBetweenMinAndMax(RANDOM_MIN, RANDOM_MAX);
    var isTargetHittable    = randomNumber != 5; 

    // #4. проверка дали удара е успешен
    var isHitSuccesful =    isTargetDetected    && 
                            isBatteryFull       &&
                            isTargetHittable;    

    if(isHitSuccesful) {

        console.log("Успешен удар, ура !!!");
        numberOfHitsUntilNow = numberOfHitsUntilNow + 1;
        // # Правим проверка дали имаме ток в системата
        if(!hasEnergy()) {

            // зареждане на батериите
            var phaseEmiterNumberCoeficient = 0; // undefined
            var nullEmiterNumberCoeficient  = 1; // undefined

            while(phaseEmiterNumberCoeficient < nullEmiterNumberCoeficient) { 

                phaseEmiterNumberCoeficient  = getRandomNumberBetweenMinAndMax(RANDOM_PHASE_EMITER__MIN, RANDOM_PHASE_EMITER__MAX);
                nullEmiterNumberCoeficient   = getRandomNumberBetweenMinAndMax(RANDOM_PHASE_EMITER__MIN, RANDOM_PHASE_EMITER__MAX);
            }

            numberOfHitsUntilNow = 0;
            console.log("Батерията е успешно заредена");
        }
    }
    else {
        console.log("Уви не става, ще пробвам отново с нови параметри");
    }
}