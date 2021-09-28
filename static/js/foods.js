class Food {
    constructor(x, y, density) {
        this.x = x + random(-density/2,density/2);
        this.y = y + random(-density/2,density/2);
    }

    render() {
        fill(255,0,0);
        noStroke();
        ellipse(this.x, this.y, 2, 2);
    }
}