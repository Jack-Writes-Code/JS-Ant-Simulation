let ants = [];
let nest;
let food;

function setup() {
  //Set size of window
  createCanvas(1200, 800);

  //Creates the nest
  nest = new Nest(width/2, height/2);
  food = new Food(30, 30);

  // Add an initial set of ants into the system
  //for (let i = 0; i < 1500; i++) {
  //  ants[i] = new Ant(nest.x, nest.y);
  //}
}

function draw() {
  //Render background
  background(200);

  //Run all the ants
  for (let i = 0; i < ants.length; i++) {
    ants[i].run();
  }

  //Render the nest
  nest.render();
  food.render();
}