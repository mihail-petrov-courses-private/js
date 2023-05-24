class Rect {

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
        this.endX   = shapeReference.endX || this.endX;
        this.endY   = shapeReference.endY || this.endY;
    }

    move(shapeReference) {
        const newEndX = shapeReference.x - this.x;
        const newEndY = shapeReference.y - this.y;

        this.endX = newEndX;
        this.endY = newEndY;
        this.x = shapeReference.x;
        this.y = shapeReference.y;

        console.clear();
        console.log(`${this.x}`)
        console.log(`${this.y}`)        
        console.log(`${this.endX}`)
        console.log(`${this.endY}`)


    }

    getWidth() {
        return this.endX - this.x;
    }

    getHeight() {
        return this.endY - this.y;
    }

    render(canvasContext) {

        canvasContext.beginPath();
        canvasContext.fillStyle     = this.color;
        canvasContext.strokeStyle   = "#000000"        
        canvasContext.rect(this.x, this.y, this.getWidth(), this.getHeight());
        canvasContext.stroke();
        canvasContext.fill();
        canvasContext.closePath();
    }

    isSelectable(toolEventReference) {

        const x = toolEventReference.x;
        const y = toolEventReference.y;

        return  (this.x < x < this.endX) &&
                (this.y < y < this.endY);
    }
}