// Ant class
class Ant {
    constructor(x, y) {
        this.position = createVector(x, y);
        this.width = 2;
        this.height = 2;

        this.acceleration = createVector(0,0);
        this.velocity = p5.Vector.random2D();

        this.maxspeed = 0.5;
        this.maxforce = 0.05;

        this.hasFood = false;
    }

    run() {
        this.update();//calculates new movement
        this.render();//draws them in their position
    }

    //Draw ant as a circle
    render() {
        fill(80);
        stroke(50);
        ellipse(this.position.x, this.position.y, this.width, this.height);
    }

    //Method to keep ants onscreen
    onScreen() {
        let offset = 2;
        if (this.position.x > width+offset) {
            this.position.x = -offset;
        }
        if (this.position.x < -offset) {
            this.position.x = width+offset;
        }
        if (this.position.y > height+offset) {
            this.position.y = -offset;
        }
        if (this.position.y < -offset) {
            this.position.y = height+offset;
        }
    }

    //Update ant location
    update() {
        // Search for the food if the ant has none
        if (this.hasFood == false) {
            this.searchForFood();
        }
        
        // Update velocity
        this.velocity.add(this.acceleration);
        // Limit speed
        this.velocity.limit(this.maxspeed);
        this.position.add(this.velocity);
        // Reset acceleration to 0 each cycle
        this.acceleration.mult(0);
        //keeps them onscreen
        this.onScreen();
    }

    searchForFood() {
        this.velocity.add(random(-0.2,0.2),random(-0.2,0.2));
    }


}