class Line {
    
    constructor(shapeReference) {

        this.x = shapeReference.x;
        this.y = shapeReference.y;
        this.endX = shapeReference.endX;
        this.endY = shapeReference.endY;
    }

    render(canvasContext) {

        canvasContext.strokeStyle = "#0000FF";
        canvasContext.beginPath();
        canvasContext.moveTo(this.x, this.y);
        canvasContext.lineTo(this.endX, this.endY);
        canvasContext.stroke();
    }
}