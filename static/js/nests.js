class Nest {
    constructor(x, y) {
        this.width = 50;
        this.height = 50;
        this.x = x;
        this.y = y;
    }

    render() {
        fill(255);
        noStroke();
        ellipse(this.x, this.y, this.width, this.height);
    }
}