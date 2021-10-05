class Food {
    constructor(x, y, density) {
        this.position = createVector(x + random(-density/2,density/2), y + random(-density/2,density/2));
    }

    render() {
        fill(255,0,0);
        noStroke();
        ellipse(this.position.x, this.position.y, 2, 2);
    }

    destroy(food) {
        this.index = food.indexOf(this);
        food.splice(this.index, 1);
    }
}