class Nest {
    constructor(x, y) {
        this.width = 50;
        this.height = 50;
        this.position = createVector(x, y);
        this.foodCount = 0;
    }

    render() {
        fill(165,42,42);
        noStroke();
        ellipse(this.position.x, this.position.y, this.width, this.height);
    }
}