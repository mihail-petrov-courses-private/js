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

// Необходимо е да програмираме бойна система, все пак робота ни е каратист, трябва да проверяваме няколко неща, 

// * дали мишката се намира пред робота, 
// Робота имплементира сложна система за откриване на обекти, получава от околната среда броя на пикселите в пространството ( въвежда се на ръка от вас, нямаме пари за сензори ) и ако броят им се дели на 2 без остатък то тогава мишката е засечена и робота се приготвя за атака.
var environmentInputPixels = prompt("Моля въведете броя на пикселите наоколо ? ");
var isTargetDetected       = environmentInputPixels % 2 == 0;


// * дали батерията е заредена и 
// Дали батерията е заредена се разбира от броя на направените удари до този момент. Робота може да направи общо 4 удара, преди да му паднат батериите ако броя на ударите е под това число то може да се направи още един
var numberOfHitsUntilNow = 0;
// hasBatteryPower / isBatteryOn / hasPower
var isBatteryFull = numberOfHitsUntilNow < MAX_NUMBER_OF_HIT;


// * дали можем да нанесем удар без да потрошим мебелите вкъщи, за всичко тези условие е необходимо да направим проверки.
// Дали удара ще бъде съкрушителен за мебелите се определя на случаен принцип, Генерира се произволно число от 1 до 10 и ако числото е равно на 5 то удара изпотрошава мебелите, в противен случай го отнася само мишката.
var randomNumber    = Math.random() * (RANDOM_MAX - RANDOM_MIN) + RANDOM_MIN;
randomNumber        = Math.floor(randomNumber);

// може да съдържаме негативна логика в променливата
var isFurbitureHitable  = randomNumber == 5;

// може да съдържаме позитивна логика в променливата
var isTargetHittable    = randomNumber != 5;

// проверка дали удара е успешене
var isHitSuccesful =    isTargetDetected    && 
                        isBatteryFull       &&
                        isTargetHittable;

if(isHitSuccesful) {
    // вариант с присвояване на същата променлива +1 
    numberOfHitsUntilNow = numberOfHitsUntilNow + 1;

    // вариант с кратко приясвояване
    // numberOfHitsUntilNow += 1;

    // вариант с инкрементация
    // numberOfHitsUntilNow++;


    // # Правим проверка дали имаме ток в системата
    var hasEnergy = numberOfHitsUntilNow < MAX_NUMBER_OF_HIT;

    if(hasEnergy) {
        // да повторим цялата операция
    }
    else {
        // зареждане на батериите
        var phaseEmiterNumberCoeficient  = Math.random() * (RANDOM_PHASE_EMITER__MAX - RANDOM_PHASE_EMITER__MIN) + RANDOM_PHASE_EMITER__MIN;
        phaseEmiterNumberCoeficient        = Math.floor(phaseEmiterNumberCoeficient);        

        var nullEmiterNumberCoeficient  = Math.random() * (RANDOM_PHASE_EMITER__MAX - RANDOM_PHASE_EMITER__MIN) + RANDOM_PHASE_EMITER__MIN;
        nullEmiterNumberCoeficient        = Math.floor(nullEmiterNumberCoeficient);

        var isEmiterChargable =  phaseEmiterNumberCoeficient > nullEmiterNumberCoeficient;
        if(isEmiterChargable) {
            numberOfHitsUntilNow = 0;
        }
    }
}