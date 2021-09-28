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
        this.previousLocations = [];
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
        } //else if food in range go to it and pick it up
        //else if has food bring it back to the nest
    
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
        this.acceleration.add(this.separate(ants));
        this.velocity.add(random(-0.2,0.2),random(-0.1,0.1));
    }

    //makes the ants stay apart from eachother
    separate(ants) {
        let desiredseparation = 10;
        let steer = createVector(0, 0);
        let count = 0;
        // For every boid in the system, check if it's too close
        for (let i = 0; i < ants.length; i++) {
          let d = p5.Vector.dist(this.position, ants[i].position);
          // If the distance is greater than 0 and less than an arbitrary amount (0 when you are yourself)
          if ((d > 0) && (d < desiredseparation)) {
            // Calculate vector pointing away from neighbor
            let diff = p5.Vector.sub(this.position, ants[i].position);
            diff.normalize();
            diff.div(d); // Weight by distance
            steer.add(diff);
            count++; // Keep track of how many
          }
        }
        // Average -- divide by how many
        if (count > 0) {
          steer.div(count);
        }
        // As long as the vector is greater than 0
        if (steer.mag() > 0) {
            // Implement Reynolds: Steering = Desired - Velocity
            steer.normalize();
            steer.mult(this.maxspeed);
            steer.sub(this.velocity);
            steer.limit(this.maxforce);
        }
        return steer;
    }


}