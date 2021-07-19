class Rect {

    constructor(shapeReference) {

        this.x      = shapeReference.x;
        this.y      = shapeReference.y;
        this.endX   = shapeReference.endX;
        this.endY   = shapeReference.endY;
    }

    setDimention(shapeReference) {

        this.x      = shapeReference.x || this.x;
        this.y      = shapeReference.y || this.y;
        this.endX   = shapeReference.endX || this.endX;
        this.endY   = shapeReference.endY || this.endY;
    }

    getWidth() {
        return this.endX - this.x;
    }

    getHeight() {
        return this.endY - this.y;
    }

    render(canvasContext) {
        canvasContext.fillStyle="#FF0000";
        canvasContext.strokeStyle="#000000"
        canvasContext.beginPath();
        canvasContext.rect(this.x, this.y, this.getWidth(), this.getHeight());
        canvasContext.stroke();
        canvasContext.fill();
    }
}