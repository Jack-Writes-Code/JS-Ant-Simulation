let ants = [];
let nest;
let food = [];
let density = 5;

function setup() {
  //Set size of window
  createCanvas(600, 600);

  //Creates the nest
  nest = new Nest(width/2, height/2);

  //Creates our food
  const foodx = random(0,width);
  const foody = random(0,height);
  for (let i = 0; i < density*10; i++) {
    food[i] = new Food(foodx, foody, density);
  }
  console.log(food.length);

  // Add an initial set of ants into the system
  for (let i = 0; i < 250; i++) {
    ants[i] = new Ant(nest.position.x, nest.position.y);
  }
}

function draw() {
  //Render background
  background(200);

  //Run all the ants
  for (let i = 0; i < ants.length; i++) {
    ants[i].run();
  }
  for (foodItem in food) {
    food[foodItem].render();
  }
  //Render the nest
  nest.render();

}