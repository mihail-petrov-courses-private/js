function isStepValid() {

    var moveEmotionCoeficient = random(100);

    if(currentEmotion == EMOTION_TRAGEDY && isInInterval(moveEmotionCoeficient, 1, 10)) {
        return true;
    }

    if(currentEmotion == EMOTION_PRODUCTIVITY && isInInterval(moveEmotionCoeficient, 2, 100)) {
        return true;
    }
    
    if(currentEmotion == EMOTION_CHAOS && isInInterval(moveEmotionCoeficient, 1, 15)) {
        return true;
    }
    
    if(currentEmotion == EMOTION_FRENDLINES && isInInterval(moveEmotionCoeficient, 1, 65)) {
        return true;
    }

    return false;
}

function isEncouragementSuccessful(message) {

    if(currentEmotion == EMOTION_TRAGEDY && message == 'Животът не струва.') {
        return true;
    }

    if(currentEmotion == EMOTION_PRODUCTIVITY && message == 'Разбий ги!') {
        return true;
    }
    
    if(currentEmotion == EMOTION_CHAOS && message == 'Невежеството е благодат.') {
        return true;
    }
    
    if(currentEmotion == EMOTION_FRENDLINES && message == 'Давай, ти си!') {
        return true;
    }

    return false;
}

function moveRobot() {

    if(isStepValid()) {
        stepNumber++;
        console.log(`Стъпка ${stepNumber}`);
    }
    else {
        var message = prompt("Моля въведете окуражаващ текст:");
        if(isEncouragementSuccessful(message)) {
            stepNumber++;
            console.log(`Стъпка ${stepNumber}`);    
        }
    }
}