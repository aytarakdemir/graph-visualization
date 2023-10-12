import { Vertex } from './models/vertex';

export namespace Physics{
    
    // Implementation of Hooke's Law: F = k * (- delta_x)
    export function hookesLaw(v1: Vertex, v2: Vertex, spring_length: number, spring_constant: number): void {

        const distance: number = Math.sqrt((v2.x - v1.x) ** 2 + (v2.y - v1.y) ** 2);
        const delta_dist :number = distance - spring_length;
        const force :number = - (delta_dist * spring_constant);

        // x and y components of the force.
        const force_x :number = force * (v2.x - v1.x) / distance;
        const force_y :number = force * (v2.y - v1.y) / distance;
        
        // Different forces aggregate on a vertex. It is the reason for addition and not assignment.
        v1.force_x += - force_x;
        v1.force_y += - force_y;

        v2.force_x += force_x;
        v2.force_y += force_y;
    }

    // Implementation of Coulomb's Law: F = k_e * q_1 * q_2 / (r ** 2). 
    // Vertices have no charge at the moment. In other words they all have 1 unit charge and repel each other.
    export function coulombsLaw(v1: Vertex, v2: Vertex, coulomb_constant: number): void {
        
        const distance: number = Math.sqrt((v2.x - v1.x) ** 2 + (v2.y - v1.y) ** 2);
        const force: number = coulomb_constant / distance ** 2;

        // x and y components of the force.
        const force_x :number = force * (v2.x - v1.x) / distance;
        const force_y :number = force * (v2.y - v1.y) / distance;

        // Different forces aggregate on a vertex. It is the reason for addition and not assignment.
        v1.force_x += - force_x;
        v1.force_y += - force_y;

        v2.force_x += force_x;
        v2.force_y += force_y;
        
    }
    
};