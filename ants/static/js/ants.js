// Ant class
class Ant {
    constructor(x, y) {
        //Visual properties
        this.position = createVector(x, y);
        this.width = 3;
        this.height = 3;
        this.colour = 80;
        //Movement stats
        this.acceleration = createVector(0,0);
        this.velocity = p5.Vector.random2D();
        this.maxspeed = random(0.3,0.7);
        this.maxforce = 0.05;
        //Behaviour Status
        this.status = "SearchingForFood";
    }

    run() {
        this.update();//calculates new movement
        this.render();//draws them in their position
    }

    //Draw ant as a circle
    render() {
        fill(this.colour);
        noStroke();
        ellipse(this.position.x, this.position.y, this.width, this.height);
    }

    //Update ant location
    update() {
        // Main behaviour state
        switch(this.status) {
            case "SearchingForFood":
                this.searchForFood();
                break;
            case "SeesTrail":
                console.log("Trail spotted.")
                break;
            case "SeesFood":
                this.moveTo(this.target);
                this.tryPickUp(this.target);
                //Leave trail to lead others to food
                break;
            case "HasFood":
                this.moveTo(nest);
                this.dropFood(nest);
                //Leave trail to home which can be backtracked
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
                this.status = "SeesFood";
                this.target = food[i];
            }
        }
    }

    //Test to see if we can pick up the food
    tryPickUp(food) {
        let distanceToTarget = p5.Vector.dist(this.position, food.position);
        if (distanceToTarget < 0.1) {
            //This needs to remove the food and set
            //ants food carrying status to true so it goes home
            this.status = "HasFood";
            this.colour = 130;
            console.log(distanceToTarget);
        }
    }

    //Test to see if we can pick up the food
    dropFood(nest) {
        let distanceToTarget = p5.Vector.dist(this.position, nest.position);
        if (distanceToTarget < 0.1) {
            //This needs to remove the food and set
            //ants food carrying status to true so it goes home
            this.status = "SearchingForFood";
            this.colour = 255;
            console.log(distanceToTarget);
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