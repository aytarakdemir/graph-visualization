
export class Vertex {
    x: number;
    y: number;
    radius: number;
    label: string;
    dragging: boolean;
    force_x: number;
    force_y: number;

    private xDiff!: number;
    private yDiff!: number;

    constructor(x = 10, y = 10, radius = 10, label?:string) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        label ? this.label = label: this.label = "";
        this.dragging = false;
        this.force_x = 0;
        this.force_y = 0;
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

    private updateLocation(targetX: number, targetY: number, canvasWidth: number, canvasHeight: number): void {
        // All work here is for keeping the vertices in the bounderies of the canvas.
        // '2' is the stroke weight of the drawings. It can be taken as a parameter.
        // Without it boundery of the vertices clip through the canvas.
        if(targetX > this.radius) this.x = Math.min(targetX, canvasWidth - this.radius - 2);
        else this.x = this.radius + 2;

        if(targetY > this.radius) this.y = Math.min(targetY, canvasHeight - this.radius - 2);
        else this.y = this.radius + 2;
    }

    handleMovement(mouseX: number, mouseY: number, canvasWidth: number = 500, canvasHeight: number = 500,
         hookesLawActive: boolean, coulombsLawActive: boolean, maxForce: number): void {
        
        if(this.dragging){
            this.updateLocation(mouseX - this.xDiff, mouseY - this.yDiff, canvasWidth, canvasHeight);
        }
        else{
            if(hookesLawActive || coulombsLawActive){

                // About Force: Currently any force is applied directly and linearly to position change.
                // No implementation of velocity, accelaration, mass or inertia as of now.

                // scale down to max force
                const force_sq: number = this.force_x ** 2 + this.force_y ** 2;
                if(force_sq > maxForce ** 2){
                    this.force_x *= (maxForce / force_sq);
                    this.force_y *= (maxForce / force_sq);
                }

                // update loc according to force
                this.updateLocation(this.force_x + this.x, this.force_y + this.y, canvasWidth, canvasHeight);
                // reset force
                this.force_x = 0;
                this.force_y = 0;
            }
        }

    }

}