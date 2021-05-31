function random(upperBound) {
    return (Math.random() * (upperBound - 1) + 1)
}

function isInInterval(what, startBound, endBound) {
    return what <= endBound && what >= startBound;
}
