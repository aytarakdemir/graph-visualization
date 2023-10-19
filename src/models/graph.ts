import { Vertex } from "./vertex";


export class Graph {

    edges: [Vertex, Vertex][] = [];
    
    constructor(
        public vertices: Vertex[] = []
        ) {
        
    }
}