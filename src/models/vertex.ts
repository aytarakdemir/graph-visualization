
export class Vertex {
    x: number;
    y: number;
    radius: number;
    label: string;
    dragging: boolean;

    private xDiff: number;
    private yDiff: number;

    constructor(x = 10, y = 10, radius = 10, label?:string) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        label ? this.label = label: this.label = "";
        this.dragging = false;
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
        if(targetX <= canvasWidth) this.x = targetX;
        if(targetY <= canvasHeight) this.y = targetY;
    }

    handleMovement(mouseX: number, mouseY: number, canvasWidth?: number, canvasHeight?: number,
         hookesLawActive?: boolean, coulombsLawActive?: boolean): void {
        
        if(this.dragging){
            this.updateLocation(mouseX - this.xDiff, mouseY - this.yDiff, canvasWidth, canvasHeight);
        }
        else{
            if(hookesLawActive || coulombsLawActive){
                // update loc according to force
                // reset force
            }
        }

    }

}