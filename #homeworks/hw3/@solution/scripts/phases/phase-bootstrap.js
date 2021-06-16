function bootstrap() {

    currentEmotion = getEmotion();

    if(currentEmotion == EMOTION_TRAGEDY) {
        console.log("Сега стана страшно");
    }

    if(currentEmotion == EMOTION_PRODUCTIVITY) {
        console.log("Работа, работа, работа")
    }
    
    if(currentEmotion == EMOTION_CHAOS) {
        console.log("Време е да унищожим всички човеци")
    }
    
    if(currentEmotion == EMOTION_FRENDLINES) {
        console.log("Прекрасен ден птичките пеят")
    }

    if(currentEmotion == EMOTION_DEPRESION) {
        console.log("Трудно е да си робот :(");
    }    
}