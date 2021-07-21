const canva = (domElement) => {
    return new Canvas(domElement);
};

class Canvas {

    constructor(domElement) {
        this.shapeCollection    = [];
        this.canvasContext      = domElement.getContext('2d');

        this.canvasWidth        = domElement.width;
        this.canvasHeight       = domElement.height;

        // ** 
        this.shapeId            = null;
        this.shapeColor         = null;
        this.selectedShape      = null;

        // 
        this.toolId             = null;
    }

    isActionShapeRelated() {
        return !!this.shapeId;
    }

    isActionToolRelated() {
        return !!this.toolId;
    }

    getSelectableShape(eventReference) {

        for(const shape of this.shapeCollection) {
            if(shape.isSelectable(eventReference)) {
                return shape
            }
        }

        return null;
    }


    initToolEvent(eventReference) {

        // TODO : think about selection state
        if(this.toolId == 'move') {

            const shape = this.getSelectableShape(eventReference);

            if(shape) {
                this.select(shape);
            }
        }
    }

    processToolEvent(eventReference) {

        if(this.toolId == 'move') {

            if(this.hasSelected()) {
                this.getSelected().move(eventReference);
            }
        }
    }    

    add(shapeReference) {

        if(this.hasShapeId()) {

            const shape = canvasFactory(this.getShapeId(), shapeReference);
            this.select(shape);
            this.shapeCollection.push(shape);
        }        
    }

    hasShapeId() {
        return !!this.getShapeId();
    }

    setShapeId(shapeId) {

        this.shapeId = shapeId;
        this.toolId  = null;    
    }

    getShapeId() {
        return this.shapeId;
    }

    hasShapeColor() {
        return !!this.getShapeColor();
    }

    getShapeColor(color) {
        return this.shapeColor;
    }    

    setShapeColor(color) {
        this.shapeColor = color;
    }

    setTool(toolId) {
        this.toolId     = toolId;
        this.shapeId    = null;
    }


    clear() {
        this.canvasContext.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    }

    select(shape) {
        this.selectedShape = shape;
    }

    deselect() {
        this.selectedShape = null;
    }

    hasSelected() {
        return !!this.selectedShape; // null
    }

    getSelected() {
        return this.selectedShape;
    }

    render() {

        this.clear();

        for(const shape of this.shapeCollection) {
            shape.render(this.canvasContext);
        }        
    }
}