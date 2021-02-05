//Create variables here
var happydog,dogImg,foodS,dog,foodStock;
var fedTime,lastFed;
var x1 = 80, y1 = 100;

function preload()
{
  //load images here
  dogImg = loadImage("dogImg.png")
  happydog = loadImage("dogImg1.png")
}

function setup() {
  createCanvas(1000,500);
  database = firebase.database()
  bottel = new MilkBottel()
  foodStock= database.ref('Food').on('value',readStock)
  dog = createSprite(250,250);
  dog.addImage(dogImg)
  dog.scale = 0.2

  feed = createButton("feed");
  feed.position(500,100);
  feed.mousePressed(feedDoggo);
  
  food = createButton("buy more")
  food.position(600,100);
  food.mousePressed(Khana)

  Name = createInput("dog's Name")
  Name.position(244,141)
  bun = createButton("submit")
  bun.position(244,200)
  bun.mousePressed(()=>{
    Name.hide()
    bun.hide()
  })

 

  fedTime = database.ref('fedTime').on('value',function(data){
    lastFed=data.val()
  });
  
}




function draw() {  
  background(46, 139, 87)


  console.log(mouseX,mouseY)

  bottel.display()
  fedTime=database.ref('FeedTime').on('value',function(data){
    lastFed=data.val()
  })
  
  //texts
  fill(0)  
  
  text("Press up aroww to feed "+Name.value(),175,350)
  text("foodRemaining:"+foodS,175,400)
  
  if(lastFed <= 12){
    text("lastfed:"+lastFed,147,94)
  }

  drawSprites();

}

function readStock(data){
  foodS = data.val();
  bottel.updateFoodStock(foodS)
}
function feedDoggo(){
  dog.addImage(happydog);
  if(bottel.getFoodStock()<= 0){
    bottel.updateFoodStock(bottel.getFoodStock()*0)
  }
  else{
    bottel.updateFoodStock(bottel.getFoodStock()-1)
  }
  database.ref('/').update({
    Food:bottel.getFoodStock(),
    feedTime:hour()
  })

}
function Khana(){
  
    foodS++;
    database.ref('/').update({
     Food:foodS
    })
}
