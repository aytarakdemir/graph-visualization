import p5 from 'p5';
import { Graph } from './models/graph';
import { Vertex } from './models/vertex';
import { Draw } from './draw';

let clickedVertex: Vertex | null = null;
let hookesLawActive = true;
let coulombsLawActive = true;

// ONE EXAMPLE
export const graph = new Graph;
graph.vertices = [
    new Vertex(500,390,20,'a'),
    new Vertex(900,850,15,'b'),
    new Vertex(700,340,20),
    new Vertex(90,90,25),
    new Vertex(150,700,30),
    new Vertex(120,300,20),
];

graph.edges = [[graph.vertices[0], graph.vertices[2]], [graph.vertices[0], graph.vertices[1]]]

const sketch = (p: p5) => {
    
    const canvasWidth : number = p.windowWidth * 0.9;
    const canvasHeight : number = p.windowHeight * 0.9;

    p.setup = () => {
        p.createCanvas(canvasWidth, canvasHeight);
        p.strokeWeight(2);
        p.frameRate(60);
    };
    
    p.draw = () => {
        p.clear(0,0,0,0);
        p.background(220);
        Draw.drawEdges(graph.edges, p)
        Draw.drawVertices(graph.vertices, p);

        if(hookesLawActive) // run func hookesLaw;
        if(coulombsLawActive) // run func coulombLaw;

        graph.vertices.forEach(vertex => {
            vertex.handleMovement(p.mouseX, p.mouseY, canvasWidth, canvasHeight);
        });
        

    };

    p.mousePressed = () => {
        graph.vertices.forEach(vertex => {
            if(vertex.isPressed(p.mouseX, p.mouseY)) {
                clickedVertex = vertex;
                clickedVertex.dragging = true;
            }            
        });
    };

    p.mouseReleased = () => {
        clickedVertex = null;
    }

    /* p.mouseDragged = () => {
        if (clickedVertex) {
            clickedVertex.dragging = true;
        }
    } */
};

new p5(sketch);
