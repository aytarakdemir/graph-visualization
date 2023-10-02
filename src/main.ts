import p5 from 'p5';

const sketch = (p: p5) => {
    p.setup = () => {
        p.createCanvas(400, 200);
    };
    
    p.draw = () => {
        p.background(220);
        p.ellipse(50, 50, 50, 50);
    };

    p.mouseClicked = () => {
        console.log("asd")
    };
};

new p5(sketch);
