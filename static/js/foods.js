class Food {
    constructor(w, h) {
        this.width = w;
        this.height = h;
        this.x = random(0,width-w);
        this.y = random(0,height-h);
    }

    render() {
        fill(200, 50, 30);
        stroke(20);
        square(this.x, this.y, this.height);
    }
}