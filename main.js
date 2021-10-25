x = 0;
y = 0;
draw_apple = "";
to_number = ""
screen_width = "";
screen_height = "";
speak_data = "";

var SpeechRecognition = window.webkitSpeechRecognition;
  
var recognition = new SpeechRecognition();

function start()
{
  document.getElementById("status").innerHTML = "System is listening please speak";  
  recognition.start();
} 
 
recognition.onresult = function(event) {

 console.log(event); 

 content = event.results[0][0].transcript;

 document.getElementById("status").innerHTML = "The speech has been recognized: " + content; 
 to_number = Number(content);
 if(Number.isInteger(to_number)){
   draw_apple = "set";
 }

 if(content == "clear Canvas" || content == "clear the Canvas" || content == "clear"){
   canvas.background("pink");
   document.getElementById("status").innerHTML = "Canvas is cleared";
   speak_data = "canvas is cleared";
   speak();
 }
}

function preload(){
  apple = loadImage("apple.png");
}

function setup() {
  screen_width = window.innerWidth;
  screen_height = window.innerHeight;
  canvas = createCanvas(screen_width, screen_height-150);
}

function draw() {
  if(draw_apple == "set")
  {
    for(var i = 1; i <= to_number; i++){
      console.log(i);
      x = Math.floor(Math.random() * 700);
      y = Math.floor(Math.random() * 400);
      image(apple, x, y, 50, 50);
    }
    document.getElementById("status").innerHTML = to_number + " Apples drawn";
    if(to_number < 2){
      speak_data = to_number + "apple is drawn";
    }
    else{
      speak_data = to_number + "apples are drawn";
    }
    speak();
    draw_apple = "";
  }
}

function speak(){
    var synth = window.speechSynthesis;

    var utterThis = new SpeechSynthesisUtterance(speak_data);

    synth.speak(utterThis);
}
