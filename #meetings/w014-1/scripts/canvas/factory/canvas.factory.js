const canvasFactory = (tool, reference) => {
    if(tool == 'rect'   ) return new Rect(reference);
    if(tool == 'circle' ) return new Circle(reference);
    if(tool == 'line'   ) return new Line(reference);
}