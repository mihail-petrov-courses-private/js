const canvas = domat("#canvas");

// canvas tools cation
const rectTool      = domat("#rect");
const lineTool      = domat("#line");
const circleTool    = domat("#circle");


const canvasDom     = document.getElementById("canvas");
const canvasContext = canvasDom.getContext('2d');
// 1. Дефиниране на цвят (опционално) --> бял цвят
// 2. Дефиниране на рамка  (опционално) --> бяла рамка
// 3. Дефиниране на фигура  (задължително)
// 4. Фактическо изчертаване (автоматично)


let tool;
const shapeCollection = [];

const render = () => {

    canvasContext.clearRect(0,0, 650, 315);

    for(const shape of shapeCollection) {
        shape.render(canvasContext);
    }
}


rectTool.on('click', () => {
    tool = 'rect';
});

circleTool.on('click', () => {
    tool = 'circle';
});

lineTool.on('click', () => {
    tool = 'line';
});

canvas.on('mousedown', (event) => {

    console.log("**")
    console.log(event);

    shapeCollection.push(canvasFactory(tool, {
        x: event.layerX, 
        y: event.layerY
    }))
});

canvas.on('mousemove', (event) => {

    shapeCollection[shapeCollection.length - 1].setDimention({
        endX: event.layerX, 
        endY: event.layerY
    });

    render();
});


canvas.on('mouseup', (event) => {

    shapeCollection[shapeCollection.length - 1].setDimention({
        endX: event.layerX, 
        endY: event.layerY
    });

    render();
})