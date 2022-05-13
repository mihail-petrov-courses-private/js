



while(isRunning()) {

    if(isPhaseBootstrap()) {
        bootstrap();
    }

    if(isPhaseMove()) {
        moveRobot();
    }

    if(isPhaseDetect()) {
        detectBaniza();
    }

    if(isPhaseTake()) {
        takeBaniza();
    }

    if(isPhaseSelfDestruct()) {
        console.log("Сбогом жесток свят");
    }
}