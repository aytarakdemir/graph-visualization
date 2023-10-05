import p5 from 'p5';
import { Vertex } from './models/vertex';



let clickedVertex: Vertex = null;

const inputtedVertices: Vertex[] = [
    new Vertex(500,390,20,'a'),
    new Vertex(900,850,15,'b'),
    new Vertex(700,340,20),
    new Vertex(90,90,25),
    new Vertex(150,700,30),
    new Vertex(120,300,20),
];

 
const sketch = (p: p5) => {
    p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight - 10);
        p.strokeWeight(2);
        p.background(220);
        p.frameRate(60);
    };
    
    p.draw = () => {
        p.clear(0,0,0,0);
        
        drawVertices(inputtedVertices, p);
    };

    p.mousePressed = () => {
        console.log('pressed')
        inputtedVertices.forEach(vertex => {
            if(vertex.isPressed(p.mouseX, p.mouseY)) {
                clickedVertex = vertex;
            }            
        });
    };

    p.mouseReleased = () => {
        clickedVertex = null;
    }

    p.mouseDragged = () => {
        if (clickedVertex) {
            clickedVertex.moveVertex(p.mouseX, p.mouseY);
        }
    }
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
