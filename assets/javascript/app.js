var alphabet = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
var words = [
  "woody",
  "buzz-lightyear",
  "rex",
  "andy",
  "slinky-dog",
  "mr-potato-head",
  "jessie",
  "zurg",
  "hamm",
  "the-claw"
];
var selectedWord = "";
var lives = 5;
var rightGuesses = []; 
var wrongGuesses = []; 

// Elements
var claw = document.getElementById('claw');
var wordsElem = document.getElementById('selected-word');
var alphabetElem = document.getElementById('alphabet');
var livesElem = document.getElementById('lives');
var musicElem = document.getElementById(' music');
var theClawSound = document.getElementById('sound2');

// Buttons
var restartBtn = document.getElementById('restart-btn');

/* ==== DEBUG BUTTONS ==== */
// var startBtn = document.getElementById('start');
// var moveLeftBtn = document.getElementById('move-left');
// var moveRightBtn = document.getElementById('move-right');
// var moveDownBtn = document.getElementById('move-down');
// var moveUpBtn = document.getElementById('move-up');
// var clawRightBtn = document.getElementById('claw-right');
// var clawWrongBtn = document.getElementById('claw-wrong');
// var randomWordBtn = document.getElementById('random-word');

// Buttons Actions
restartBtn.addEventListener('click', restart);

/* ==== DEBUG BUTTONS ==== */
// startBtn.addEventListener('click', restart);
// moveLeftBtn.addEventListener('click', moveLeft); 
// moveRightBtn.addEventListener('click', moveRight);
// moveDownBtn.addEventListener('click', moveDown);
// moveUpBtn.addEventListener('click', moveUp);
// clawRightBtn.addEventListener('click', clawRight);
// clawWrongBtn.addEventListener('click', clawWrong);
// randomWordBtn.addEventListener('click', randomWord);

function randomWord() {
  livesElem.innerHTML = lives;
  var random = Math.floor( (Math.random() * words.length) ); 

  selectedWord = words[ random ]; 

  for(var i = 0; i < selectedWord.length; i++) { 
    var letter = selectedWord[i]; 

    var li = document.createElement('LI');
    
    if(letter == '-') { 
      li.innerHTML = ' '; 
    } else {
      li.innerHTML = '_'; 
    }

    wordsElem.appendChild(li); 
  }
}
randomWord(); 

function generateAlphabet() {
  alphabetElem.innerHTML = ""; 

  for(var i = 0; i < alphabet.length; i++) { 
    var letter = alphabet[i]; 
    var li = document.createElement('LI'); 
    li.innerHTML = letter; 

    if( wrongGuesses.indexOf( alphabet[i] ) > -1 ) { 
      li.classList = 'wrong'; 
    }

    if( rightGuesses.indexOf( alphabet[i] ) >-1 ) { 
      li.classList = 'right'; 
    }
    
    li.addEventListener('click', function(e){ 
      var letter = e.target.innerHTML; 
      wordGuess(letter); 
    });

    alphabetElem.appendChild(li); 
  }
}
generateAlphabet(); 



// Claw Animation Functions
function moveLeft() {
  claw.classList.remove('move-right');
  claw.classList.add('move-left');
}

function moveRight() {
  claw.classList.remove('move-left');
  claw.classList.add('move-right');
}

function moveDown() {
  claw.classList.remove('move-left');
  claw.classList.remove('move-right');
  claw.classList.add('move-down');
}

function moveUp() {
  claw.classList.remove('move-left');
  claw.classList.remove('move-right');
  claw.classList.remove('move-down');
}

function clawRight() {
  claw.classList.remove('claw-wrong');
  claw.classList.add('claw-right');

  setTimeout(function() {
    claw.classList.remove('move-left');
    claw.classList.remove('move-right');
    claw.classList.remove('move-down');
  }, 1000);
}

function clawWrong() {
  claw.classList.remove('claw-right');
  claw.classList.add('claw-wrong');

  setTimeout(function() {
    claw.classList.remove('move-left');
    claw.classList.remove('move-right');
    claw.classList.remove('move-down');
  }, 1000);
}


// App Functions
function restart() {
  lives = 5; 
  livesElem.innerHTML = lives;
  alphabetElem.style.display = 'block'; 
  restartBtn.style.display = 'none'; 
  rightGuesses = []; 
  wrongGuesses = []; 
  wordsElem.innerHTML = ''; 
  randomWord(); 
  generateAlphabet(); 


  claw.classList.remove('move-left');
  claw.classList.remove('move-right');
  claw.classList.remove('move-down');
  claw.classList.remove('claw-right');
  claw.classList.remove('claw-wrong');
}

function wordGuess(letter) { 

  if( selectedWord.indexOf(letter) !== -1 ) {
    fillLetter(letter); 
  } else {
    wrongGuesses.push(letter); 
    lives--; 
    livesElem.innerHTML = lives; 


    
    if(lives < 1) { 
      console.log('Morreu...');
      alphabetElem.style.display = 'none'; 
      moveDown(); 
      setTimeout(clawWrong, 1000); 
      setTimeout(function(){
        restartBtn.style.display = 'block'; 
      }, 3500);
    }
  }

  //  Animation
  if(claw.classList.contains('move-right')) { 
    moveLeft();
  } else {
    moveRight(); 
  }

  // document.getElementById('stopBtn').onclick = function(){
  //   var sounds = document.getElementsByTagName('audio');
  //   for(1=0; i<sounds.length; i++) sounds[i].pause();
  // }  

  generateAlphabet(); 
}

function fillLetter(letter) { 
  var remainingLetters = 0; 
  rightGuesses.push(letter);
  wordsElem.innerHTML = ''; 

  for(var i = 0; i < selectedWord.length; i++) { 

    var li = document.createElement('LI'); 
    
    if(selectedWord[i] == '-') { 
      li.innerHTML = ' '; 
    } else {
      
      if(rightGuesses.indexOf(selectedWord[i]) > -1 ) { 
        li.innerHTML = selectedWord[i]; 
      } else {
        li.innerHTML = '_'; 
        remainingLetters++; 
      }

    }
    wordsElem.appendChild(li); 
  }
 
  if(remainingLetters == 0) { 
    theClawSound.play();
    sound.volume = 0.3;
    console.log('GANHOU...'); 
    alphabetElem.style.display = 'none'; 
    moveDown(); 
    setTimeout(clawRight, 1000); 
    setTimeout(function(){
      restartBtn.style.display = 'block'; 
    }, 3500);
  }
}


 //  Background Sound
 var sound = document.getElementById("sound1"); 
 function btn(){
     if (sound.paused !==true){
      var theClawSound = document.getElementById('sound2');
      var img = new Image();
      img.onload = function() {
      theClawSound.appendChild(sound);
      }
      console.log(img);
       sound.pause();
       img.src = 'assets/images/mute.png';
     }else {
         sound.play();
     }
 }




