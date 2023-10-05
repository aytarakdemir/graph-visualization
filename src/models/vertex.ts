
export class Vertex {
    x: number;
    y: number;
    radius: number;
    label: string;

    constructor(x = 10, y = 10, radius = 10, label?:string) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        label ? this.label = label: this.label = "";
    }
}