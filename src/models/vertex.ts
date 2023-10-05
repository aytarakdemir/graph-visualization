
export class Vertex {
    x: number;
    y: number;
    radius: number;
    label: string;

    private xDiff: number;
    private yDiff: number;

    constructor(x = 10, y = 10, radius = 10, label?:string) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        label ? this.label = label: this.label = "";
    }

    isPressed(mouseX: number, mouseY: number): boolean {
        const distanceSq: number = (this.x - mouseX) ** 2 + (this.y - mouseY) ** 2;
        const isInside: boolean = distanceSq < this.radius ** 2;
        if (isInside) {
            this.calculateDistanceFromCenter(mouseX, mouseY);    
        }
        return isInside;
    }

    calculateDistanceFromCenter(mouseX: number, mouseY: number): void {
        this.xDiff = mouseX - this.x;
        this.yDiff = mouseY - this.y;
    }

    moveVertex(pressedMouseX: number,pressedMouseY: number): void {
        this.x = pressedMouseX - this.xDiff;
        this.y = pressedMouseY - this.yDiff;
    }
}