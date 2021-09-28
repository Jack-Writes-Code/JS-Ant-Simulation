let ants = [];
let nest;
let food = [];
let density = 20;

function setup() {
  //Set size of window
  createCanvas(1200, 800);

  //Creates the nest
  nest = new Nest(width/2, height/2);

  //Creates our food
  const foodx = random(0,width);
  const foody = random(0,height);
  for (let i = 0; i < density*3; i++) {
    food[i] = new Food(foodx, foody, density);
  }

  // Add an initial set of ants into the system
  for (let i = 0; i < 200; i++) {
    ants[i] = new Ant(nest.x, nest.y);
  }
}

function draw() {
  //Render background
  background(200);

  //Run all the ants
  for (let i = 0; i < ants.length; i++) {
    ants[i].run();
  }
  for (let i = 0; i < food.length; i++) {
    food[i].render();
  }
  //Render the nest
  nest.render();

}