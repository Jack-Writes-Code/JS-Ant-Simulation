let ants = [];
let pheromones = [];
let nest;
let food = [];
let density = 5;

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
        this.update();
        this.render();
    }

    render() {
        fill(this.colour);
        noStroke();
        ellipse(this.position.x, this.position.y, this.width, this.height);
    }

    update() {
        if (this.status != "HasFood") {
            this.searchForFood();
        }

        switch(this.status) {
            case "SeesTrail":
                console.log("Trail spotted.")
                break;
            case "SeesFood":
                this.moveTo(this.target);
                this.tryPickUp(this.target);
                pheromones.push(this.position.x, this.position.y, Date.now());
                break;
            case "HasFood":
                this.moveTo(nest);
                this.dropFood(nest);
                //Leave trail to home which can be backtracked
                break;
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
        
        for (let foodItem in food) {
            let diff = p5.Vector.dist(this.position, food[foodItem].position);
            let nearest = 1000000;
            if (diff <= 50 && diff <= nearest) {
                this.status = "SeesFood";
                this.target = food[foodItem];
            }
        }
        for (let pheromone in pheromones) {
            let diff = p5.Vector.dist(this.position, pheromones[pheromone].position);
            let nearest = 1000000;
            if (diff <= 50 && diff <= nearest) {
                if (this.status != "Sees|Trail") {
                    this.status = "SeesTrail";
                    this.target = pheromones[pheromone];
                }
                }
            }
        }
    }

    //Test to see if we can pick up the food
    tryPickUp(foodItem) {
        let distanceToTarget = p5.Vector.dist(this.position, foodItem.position);
        if (distanceToTarget < 0.12) {
            foodItem.destroy(food);
            this.status = "HasFood";
            this.colour = 130;
        }
    }

    dropFood(nest) {
        let distanceToTarget = p5.Vector.dist(this.position, nest.position);
        if (distanceToTarget < 0.1) {
            this.status = "SearchingForFood";
            this.colour = 255;
            nest.foodCount++;
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

function setup() {
    createCanvas(800, 800);

    nest = new Nest(width/2, height/2);

    const foodx = random(0,width);
    const foody = random(0,height);
    for (let i = 0; i < density*10; i++) {
        food[i] = new Food(foodx, foody, density);
    }

    for (let i = 0; i < 250; i++) {
        ants[i] = new Ant(nest.position.x, nest.position.y);
    }
}

function draw() {
    background(200);
    for (ant in ants) { ants[ant].run(); }
    for (foodItem in food) { food[foodItem].render(); }
    nest.render();
}