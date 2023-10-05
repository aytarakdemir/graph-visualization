import p5 from 'p5';
import { Vertex } from './models/vertex';

const sketch = (p: p5) => {
    p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight - 10);
        p.strokeWeight(2);
    };
    
    p.draw = () => {
        p.background(220);
        drawVertices(
            [
                new Vertex(500,390,20,'a'),
                new Vertex(900,850,15,'b'),
                new Vertex(700,340,20),
                new Vertex(90,90,25),
                new Vertex(150,700,30),
                new Vertex(120,300,20),
            ], 
            p
        );
    };

    p.mouseClicked = () => {
        console.log("asd")
    };
};


function drawVertices(vertices: Vertex[] = [], p: p5): void {
    vertices.forEach(vertex => {
        p.circle(vertex.x, vertex.y, vertex.radius*2);
        if (vertex.label !== "") {
            p.text(vertex.label, vertex.x, vertex.y);
            p.textAlign(p.CENTER, p.CENTER);
            p.strokeWeight(2);
            p.textStyle(p.BOLD);
        }
        
    });



}


new p5(sketch);
