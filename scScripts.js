
// StarCatcher Scripts for the game made by Soft Dev 2015
// when the web page window loads up, the game scripts will be read
window.onload = function() {

  var star = {
    _x: null,
    _y: null,
    _xSpeed: null,
    _ySpeed: null,
    _visible: true,

    //Create new star object with given starting position and speed
    //class functions exist to set other private variables
    //All inputs are double and function returns a new star
    create: function (x, y, xSpeed, ySpeed) {
      var obj = Object.create(this);
      obj._x = x;
      obj._y = y;
      obj._xSpeed=xSpeed;
      obj._ySpeed=ySpeed;
      obj._width=50;
      obj._height=50;
      obj._img = new Image();
      obj._img.src="images/star.png";
      obj._visible=true;
      return obj;
    },
    setSize: function(width, height){
      this._width += 5;
      this._height += 5;
    },
    setImage: function(img){
      this._img.src=img;
    },

    //Update the new x and y of the star based on the speed.
    //drawing functionality is left for calling class
    //no input or return
    update: function () {
      this._x+=this._xSpeed;
      this._y+=this._ySpeed;
    },

    visible: function() {
        return this._visible;
    },
  }//; close star
  //load canvas
  var canvas = document.getElementById("myCanvas");
  var ctx = canvas.getContext("2d"),
  w = canvas.width = 800,
  h = canvas.height = 500;

  ///load images
  var background = new Image();
  background.src="images/bg.jpg";
  var ship1 = new Image();
  ship1.src="images/spaceship1.png";
  var ship2 = new Image();
  ship2.src="images/spaceship2.png";
  var p1Score = 0, p2Score = 0;
  var lenny = new Image();
  lenny.src="images/leonard.png";
  var it = new Image ();
  it.src="images/thomas.png";
  var king = new Image ();
  king.src="images/king.png";

  var lennyX = w - 50;
  var lennyY = 50;
  var lennyVX = 3;
  var lennyVY = 3;

  var itX = 50;
  var itY = 50;
  var itVX = 2.5;
  var itVY = 2.5;

  var kingX = 50;
  var kingY = 50;
  var kingVX = 4;
  var kingVY = 4;

  // our stars are created using a single array with a class of information
  var starCount=5;
  var starArray=[];

  // Create an array of stars
  for (var i = 0; i < starCount; i++) {
    // this assigns each element in the array all the information for the star by
    // using the 'star' class, pass the starting x,y locations
    //  and speeds into the array.
    starArray.push(star.create(20,i+50,Math.random()*5,Math.random()*5));
  }
  // moving stars around the screen
  var p1x=w/2+100, p1y=h/2, p2x=w/2-100, p2y=h/2;
  var song =new Audio('song.mp3');

  var gameOn = true;


  // moving stars around the screen and update the players movement
  function starsUpdate () {
    //  draw star on screen only if visible
    for (var i = 0; i < starCount; i++) {
      // this checks to see if the star is visible
      if (starArray[i].visible()){
        starArray[i].update();
        ctx.drawImage(starArray[i]._img, starArray[i]._x-starArray[i]._width/2, starArray[i]._y-starArray[i]._height/2, starArray[i]._width, starArray[i]._height);
        if (starArray[i]._x>w || starArray[i]._x<0) {starArray[i]._xSpeed = -starArray[i]._xSpeed}
        if (starArray[i]._y>h || starArray[i]._y<0) {starArray[i]._ySpeed = -starArray[i]._ySpeed}
        // checking for collisions!!!
        var d1=Math.sqrt(Math.pow(p1x-starArray[i]._x,2)+Math.pow(p1y-starArray[i]._y,2));
        var d2=Math.sqrt(Math.pow(p2x-starArray[i]._x,2)+Math.pow(p2y-starArray[i]._y,2));
        if (d1<35) {scoring(i,1)}
        if (d2<35) {scoring(i,2)}

      }
    }//endFor

  } //close starsUpdate

    function leonard() {
      lennyX-= lennyVX;
      lennyY+= lennyVY;

      if (lennyX < 0 || lennyX > w){lennyVX = -lennyVX}
      if (lennyY < 0 || lennyY > h){lennyVY = -lennyVY}
      ctx.drawImage(lenny, lennyX, lennyY, 271/3, 305/3);

    }

    function thomas() {
      itX-= itVX;
      itY+= itVY;

      if (itX < 0 || itX > w){itVX = -itVX}
      if (itY < 0 || itY > h){itVY = -itVY}
      ctx.drawImage(it, itX, itY, 485/6, 511/6);

    }

    function lebron() {
      kingX-= kingVX;
      kingY+= kingVY;

      if (kingX < 0 || kingX > w){kingVX = -kingVX}
      if (kingY < 0 || kingY > h){kingVY = -kingVY}
      ctx.drawImage(king, kingX, kingY, 246/3, 346/3);

    }

    //  scoring functions to place and score stars
      function scoring(k,wp) {
          starArray[k]._visible=false;
          if (wp==1) {
              // need to place a small star next to player 1 score
              p1Score++;
              $("#p1ScoreDisp").text(p1Score);
              //song.play();
          }
          else if (wp==2) {
              p2Score++;
              $("#p2ScoreDisp").text(p2Score);
              //song.play();
          }

      }

  //Our main function which clears the screens
  //  and redraws it all again through function updates,
  //  then calls itself out again

  //Listens to app for keyboard actions
  addEventListener("keydown", function (e) {

    if (e.keyCode == 38) { //  (key: up arrow)
      p1y-=10;
    }
    if (e.keyCode == 40) { //  (key: down arrow)
      p1y+=10;
    }
    if (e.keyCode == 37) { //  (key: left arrow)
      p1x-=10;
    }
    if (e.keyCode == 39) { //  (key: right arrow)
      p1x+=10;
    }
    if (e.keyCode == 87) { //  (key: w)
      p2y-=10;
    }
    if (e.keyCode == 83) { //  (key: s)
      p2y+=10;
    }
    if (e.keyCode == 65) { //  (key: a)
      p2x-=10;
    }
    if (e.keyCode == 68) { //  (key: d)
      p2x+=10;
    }
  }, false);


  // a new array is made to keep track of a button being held down
  var keysDown = [];

  // if the key is held down, the keycode is placed in array
  // then it is deleted upon keyup command.
  // playerUpdate will now control player movements and use the keysDown array

  addEventListener("keydown", function (e) {
    keysDown[e.keyCode] = true;
  }, false);

  //  player 2 movement keyboard commands
  addEventListener("keyup", function (e) {

    if (e.keyCode == 87) { //  (key: w )
      p2y-=10;
    }
    else if (e.keyCode == 83) { //  (key: s)
      p2y+=10;
    }
    else if (e.keyCode == 65) { //  (key: a)
      p2x-=10;
    }
    else if (e.keyCode == 68) { //  (key: d)
      p2x+=10;
    }

    // start the game with keyboard command
    if (e.keyCode == 32) {
        if (gameOn == false) {
        gameOn = 1;
        main();// (key: space bar to start game)
      }
      else {
          gameOn = false
      }
    }

//take keycode out of array (not being held down anymore)
    delete keysDown[e.keyCode];
  }, false);

  //player movement
  function playerUpdate() {
    //player two hodling down a key using the array keysDown
    if (87 in keysDown) {// P2 holding down the w key
      p2y -= 5;
    }
    if (83 in keysDown) { // P2 holding down (key: s)
      p2y += 5;
    }
    if (65 in keysDown) { // P2 holding down (key: a)
      p2x -= 5;
    }
    if (68 in keysDown) { // P2 holding down (key: d)
      p2x += 5;
    }

    // player one hodling key down
    if (37 in keysDown) { // P2 holding down (key: left arrow)
      p1x -= 5;
    }
    if (38 in keysDown) { // P2 holding down (key: up arrow)
      p1y -= 5;
    }
    if (39 in keysDown) { // P2 holding down (key: right arrow)
      p1x += 5;
    }
    if (40 in keysDown) { // P2 holding down (key: down arrow)
      p1y += 5;
    }

    if (p1x>w-30) {p1x = w-50}
    if (p1x<0) {p1x = 10}
    if (p1y>h) {p1y = h-20}
    if (p1y<0) {p1y = 10}
    if (p2x>w) {p2x = w - 50}
    if (p2x<0) {p2x = 10}
    if (p2y>h) {p2y = h -50}
    if (p2y<0) {p2y = 10}

    ctx.drawImage(ship1, p1x-82, p1y-52, 164, 104);
    ctx.drawImage(ship2, p2x-82, p2y-52, 164, 104);

  }

  function main(){
    ctx.clearRect(0,0,w,h);
    ctx.drawImage(background, 0, 0, w, h);
    starsUpdate();
    playerUpdate();
    leonard();
    thomas();
    lebron();
    if (gameOn) {requestAnimationFrame(main);}

  }
  main();

} ///close onload window
