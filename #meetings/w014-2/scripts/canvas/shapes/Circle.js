class Circle {

    constructor(shapeReference) {

        this.x      = shapeReference.x;
        this.y      = shapeReference.y;
        this.endX   = shapeReference.endX;
        this.endY   = shapeReference.endY;
        this.color  = shapeReference.color || '#000000';
    }
    
    setDimention(shapeReference) {

        this.x      = shapeReference.x || this.x;
        this.y      = shapeReference.y || this.y;
        this.endX   = shapeReference.endX  || this.endX;
        this.endY   = shapeReference.endY  || this.endY;
    }

    getRadius() {
        return this.endX - this.x;
    }

    render(canvasContext) {

        canvasContext.beginPath();
        canvasContext.fillStyle=this.color;
        canvasContext.strokeStyle="#000000"
        canvasContext.arc(this.x, this.y, this.getRadius(), 0, 2 * Math.PI); // програмна изчертавка
        canvasContext.stroke(); // изчертава рамка
        canvasContext.fill();
        canvasContext.closePath();
    }
}