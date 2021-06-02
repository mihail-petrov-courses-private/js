const generateId = function() {

    var randomGeneratedId = "";
    var numberOfRandomIterations = Math.floor(Math.random() * 50) + 10;

    for(var iterator = 0; iterator < numberOfRandomIterations; iterator++) {
        randomGeneratedId += Math.floor(Math.random() * 10);
    }

    return randomGeneratedId;
}