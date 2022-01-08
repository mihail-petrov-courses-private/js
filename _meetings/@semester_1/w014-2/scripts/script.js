const canvas        = domat("#canvas");
const canvasToolbar = domat("#canvas-toolbar");

let toolId;
const canvasManager = canva(canvas.dom());

canvasToolbar.on('click', (event) => {

    const tool  = domat(event.target);

    if(tool.hasAttr('data-shape')) {
        canvasManager.setShapeId(tool.attr('data-shape'));
    }

    if(tool.hasAttr('data-color')) {
        canvasManager.setShapeColor(tool.attr('data-color'));
    }

    if(tool.hasAttr('data-tool')) {
        canvasManager.setTool(tool.attr('data-tool'));
    }
})

canvas.on('mousedown', (event) => {

    if(canvasManager.isActionShapeRelated()) {

        canvasManager.add({
            x       : event.layerX, 
            y       : event.layerY,
            color   : canvasManager.getShapeColor() 
        });
    }

    if(canvasManager.isActionToolRelated()) {

        canvasManager.initToolEvent({
            x       : event.layerX, 
            y       : event.layerY
        });
    }
});

canvas.on('mousemove', (event) => {

    if(canvasManager.isActionShapeRelated()) {

        if(canvasManager.hasSelected()) {
            canvasManager.getSelected().setDimention({
                endX: event.layerX, 
                endY: event.layerY
            });
        }
    }

    if(canvasManager.isActionToolRelated()) {
        
        canvasManager.processToolEvent({
            x       : event.layerX, 
            y       : event.layerY
        });
    }

    canvasManager.render();
});

canvas.on('mouseup', (event) => {
    canvasManager.deselect();
})