import p5 from 'p5';
import { Vertex } from './models/vertex';

export namespace Draw{

    export function drawVertices(vertices: Vertex[] = [], p: p5): void {
        vertices.forEach(vertex => {
            p.circle(vertex.x, vertex.y, vertex.radius*2);
            if (vertex.label !== "") {
                p.text(vertex.label, vertex.x, vertex.y);
                p.textAlign(p.CENTER, p.CENTER);
                p.textStyle(p.BOLD);
            }
            
        });
    }

    export function drawEdges(edges: [Vertex,Vertex][] = [], p: p5): void {
        edges.forEach(edge => {
            p.line(edge[0].x, edge[0].y, edge[1].x, edge[1].y)
        })
    }

    
};