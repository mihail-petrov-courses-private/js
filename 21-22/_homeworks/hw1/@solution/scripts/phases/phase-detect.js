function detectBaniza() {

    if(isEmotionPositive()) {

        while(true) {

            var firstCoeficient     = random(6);
            var secondCoeficient    = random(6);
            var thirdCoeficient     = random(6);
            var coeficientSum       = firstCoeficient + secondCoeficient + thirdCoeficient;
            if(coeficientSum >= stepNumber) {
                return true;
            }
        }
    }
    else {
        // TODO: да направя връзката между разпознаването и рестартирането на емоцията
    }
}