const EMOTION_TRAGEDY       = 11;
const EMOTION_PRODUCTIVITY  = 12;
const EMOTION_CHAOS         = 13;
const EMOTION_FRENDLINES    = 14;
const EMOTION_DEPRESION     = 15;

var currentEmotion;

function isEmotionPositive() {

    return  currentEmotion == EMOTION_PRODUCTIVITY || 
            currentEmotion == EMOTION_FRENDLINES;
}

function isEmotionNegative() {

    return  currentEmotion == EMOTION_TRAGEDY || 
            currentEmotion == EMOTION_CHAOS;
}

function getEmotion() {
 
    var emotionCoeficient     = random(10);
    var tempEmotionCoeficient = random(100);
    var isEvent               = emotionCoeficient % 2 == 0; 

    var isEmotionNegative     = (tempEmotionCoeficient >= 60 &&
                                tempEmotionCoeficient <= 80) && 
                                (tempEmotionCoeficient % 3 == 0);

    var isEmotionPositive     = (tempEmotionCoeficient >= 5 &&
                                 tempEmotionCoeficient <= 55);

    if(isEvent  && isEmotionNegative) return EMOTION_TRAGEDY;
    if(isEvent  && isEmotionPositive) return EMOTION_PRODUCTIVITY;
    if(!isEvent && isEmotionNegative) return EMOTION_CHAOS;
    if(!isEvent && isEmotionPositive) return EMOTION_FRENDLINES;

    return EMOTION_DEPRESION;
}