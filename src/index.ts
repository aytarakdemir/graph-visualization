import p5 from 'p5';
import { Graph } from './models/graph';
import { Vertex } from './models/vertex';
import { Draw } from './draw';
import { Physics } from './physics';


let clickedVertex: Vertex | null = null;

// Hookes Law Parameters
let hookesLawActive = true;
const spring_constant: number = 0.01;
const spring_length: number = 120;

// Coulomb's Law Parameters
let coulombsLawActive = true;
const coulomb_constant: number = 10000;

// Movement Parameter
const maxForce: number = 30;

// ONE EXAMPLE
export const graph = new Graph;
graph.vertices = [
    new Vertex(500,390,20,'a'),
    new Vertex(900,300,15,'b'),
    new Vertex(700,340,20),
    new Vertex(90,90,25),
    new Vertex(150,400,30),
    new Vertex(120,300,20),
];

graph.edges = [
    [graph.vertices[0], graph.vertices[2]],
    [graph.vertices[0], graph.vertices[1]],
    [graph.vertices[4], graph.vertices[1]],
    [graph.vertices[2], graph.vertices[1]]
]

const sketch = (p: p5) => {
    
    const canvasWidth : number = Math.floor(p.windowWidth * 0.9);
    const canvasHeight : number = Math.floor(p.windowHeight * 0.9);

    p.setup = () => {
        p.createCanvas(canvasWidth, canvasHeight);
        p.strokeWeight(2);
        p.frameRate(60);
    };
    
    p.draw = () => {
        p.clear(0,0,0,0);
        p.background(230);

        // Physics
        if(hookesLawActive){
            graph.edges.forEach(edge => {
                Physics.hookesLaw(edge[0], edge[1], spring_length, spring_constant);
            });
        }
        
        if(coulombsLawActive){
            for(let i = 0; i < graph.vertices.length; i++){
                for(let j = i + 1; j < graph.vertices.length; j++){
                    Physics.coulombsLaw(graph.vertices[i], graph.vertices[j], coulomb_constant);
                }
            }   
        }    

        // Movement
        graph.vertices.forEach(vertex => {
            vertex.handleMovement(p.mouseX, p.mouseY, canvasWidth, canvasHeight, hookesLawActive, coulombsLawActive, maxForce);
        });
        
        // Drawing
        Draw.drawEdges(graph.edges, p)
        Draw.drawVertices(graph.vertices, p);

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
        if (clickedVertex !== null){
            clickedVertex.dragging = false;
            clickedVertex = null;
        }
    }

};

new p5(sketch);