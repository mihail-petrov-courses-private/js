const componentActiveCounter = domat("#active-counter");


let counter = 1;


PubSub.register("update-counter", () => {
    componentActiveCounter.html(counter++);
});


PubSub.register("update-counter", () => {
    console.log("Още една задача приключи");
});