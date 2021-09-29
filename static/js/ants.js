// Ant class
class Ant {
    constructor(x, y) {
        this.position = createVector(x, y);
        this.width = 2;
        this.height = 2;

        this.acceleration = createVector(0,0);
        this.velocity = p5.Vector.random2D();

        this.maxspeed = random(0.3,0.7);
        this.maxforce = 0.05;

        this.seesFood = false;
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

    //Update ant location
    update() {
        // Search for the food if the ant has none and sees none
        if (this.hasFood == true) {
            this.moveTo(nest);
        } else if (this.seesFood == true) {
            this.moveTo(this.target);
        } else {
            this.searchForFood();
        }
        
        
        this.velocity.add(this.acceleration);// Update velocity
        this.velocity.limit(this.maxspeed);// Limit speed
        this.position.add(this.velocity);
        this.acceleration.mult(0);// Reset acceleration to 0 each cycle
        this.onScreen();//keeps them onscreen
    }

    moveTo(target) {
        let direction = p5.Vector.sub(target.position, this.position);
        direction.normalize();
        this.velocity.add(direction);
        this.velocity.add(random(-0.3,0.3), random(-0.3,0.3));
    }

    moveAway(target) {
        let direction = p5.Vector.sub(this.position, target.position);
        direction.normalize();
        this.velocity.add(direction);
        this.velocity.add(random(-0.3,0.3), random(-0.3,0.3));
    }

    //Method to keep ants onscreen
    onScreen() {
        if (this.position.x > width) {
            this.moveTo(nest);
        }
        if (this.position.x < 0) {
            this.moveTo(nest);
        }
        if (this.position.y > height) {
            this.moveTo(nest);
        }
        if (this.position.y < 0) {
            this.moveTo(nest);
        }
    }



    searchForFood() {
        this.acceleration.add(this.separate(ants));
        this.velocity.add(random(-0.2,0.2),random(-0.1,0.1));
        
        for (let i = 0; i < food.length; i++) {
            let diff = p5.Vector.dist(this.position, food[i].position);
            if (diff <= 50) {
                this.seesFood = true;
                this.target = food[i];
                break;
            }
        }
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