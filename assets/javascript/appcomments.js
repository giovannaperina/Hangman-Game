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
var rightGuesses = []; // armazenar as letras corretas
var wrongGuesses = []; // armazenar as letras incorretas

// Elements
var claw = document.getElementById('claw');
var wordsElem = document.getElementById('selected-word');
var alphabetElem = document.getElementById('alphabet');
var livesElem = document.getElementById('lives');

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
// moveLeftBtn.addEventListener('click', moveLeft); // quando clicar no moveLeftBtn, chamar função moveLeft()
// moveRightBtn.addEventListener('click', moveRight);
// moveDownBtn.addEventListener('click', moveDown);
// moveUpBtn.addEventListener('click', moveUp);
// clawRightBtn.addEventListener('click', clawRight);
// clawWrongBtn.addEventListener('click', clawWrong);
// randomWordBtn.addEventListener('click', randomWord);

function randomWord() {
  livesElem.innerHTML = lives;
  var random = Math.floor( (Math.random() * words.length) ); // gerar número randomico entre 0 e a quantidade de var words

  selectedWord = words[ random ]; // pega uma palavra randomica do array words, e alimenta a variavel selectedWord

  for(var i = 0; i < selectedWord.length; i++) { // faz um loop por todas as letras da palavra gerada
    var letter = selectedWord[i]; // pego a letra

    var li = document.createElement('LI'); // crio um elemento <LI>
    
    if(letter == '-') { // se a letra for traço
      li.innerHTML = ' '; // troca para espaço
    } else {
      li.innerHTML = '_'; // se não, adiciona um underline
    }

    wordsElem.appendChild(li); // adiciono o <li> recem criado no <ul> words id="selected-word"
  }
}
randomWord(); // gero uma palavra aleatoria assim que o app iniciar

function generateAlphabet() {
  alphabetElem.innerHTML = ""; // limpo a div de alfabeto

  for(var i = 0; i < alphabet.length; i++) { // faz um loop em cada letra do array de alfabeto
    var letter = alphabet[i]; // pego a letra
    var li = document.createElement('LI'); // crio um elemento <li>
    li.innerHTML = letter; // escrevo a letra atual do loop no <li> recem criado

    if( wrongGuesses.indexOf( alphabet[i] ) > -1 ) { // se a letra atual do loop existe no array de guesses INCORRETOS
      li.classList = 'wrong'; // adiciono uma classe "wrong" na letra <li>
    }

    if( rightGuesses.indexOf( alphabet[i] ) >-1 ) { // se a letra atual do loop existe no array de guesses CORRETOS
      li.classList = 'right'; // adiciono uma classe "right" na letra <li>
    }
    
    li.addEventListener('click', function(e){ // crio um evento "click" para cada <li> criado
      // e = ao evento de clique  
      // e.target = elemento clicado
      var letter = e.target.innerHTML; // pego o HTML do <li> atual, no caso, a letra. e.target = <li> clicado
      wordGuess(letter); // chama a funcao wordGuess() passando a variavel letter como parametro
    });

    alphabetElem.appendChild(li); // adiciono o <li> no <ul> do alfabeto id="alphabet"
  }
}
generateAlphabet(); // gero o alfabeto assim que o app iniciar



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
  lives = 5; // reseta as vidas para 5
  livesElem.innerHTML = lives; // escreve a quantidade de vidas no topo
  alphabetElem.style.display = 'block'; // aparece com o alfabeto
  restartBtn.style.display = 'none'; // esconde o botao restart
  rightGuesses = []; // limpa os guesses corretos
  wrongGuesses = []; // limpa os guesses incorretos
  wordsElem.innerHTML = ''; // limpar as palavras
  randomWord(); // gerar nova palavra
  generateAlphabet(); // regenera o alfabeto

  // remove todas as classes do claw
  claw.classList.remove('move-left');
  claw.classList.remove('move-right');
  claw.classList.remove('move-down');
  claw.classList.remove('claw-right');
  claw.classList.remove('claw-wrong');
}

function wordGuess(letter) { // esperando receber o parametro letter

  if( selectedWord.indexOf(letter) !== -1 ) { // checo se o Letter existe na variavel selectedWord
    fillLetter(letter); // chamo a funcao fillLetter passando letter como parametro
  } else {
    wrongGuesses.push(letter); // adicionar uma letra errada nos guesses incorretos
    lives--; // tira 1 vida
    livesElem.innerHTML = lives; // escreve a quantidade de vidas no topo


    // MORREU MISERAVI
    if(lives < 1) { // Se a vida for menor que 0, 
      console.log('Morreu...');
      alphabetElem.style.display = 'none'; // esconde alfabeto
      moveDown(); // a garra desce
      setTimeout(clawWrong, 1000); // depois de 1 segundo ela sobe sem nada
      setTimeout(function(){
        restartBtn.style.display = 'block'; // depois de 3.5 segundos, aparece o botao restart
      }, 3500);
    }
  }

  // faz a animação da garra mover para um lado ou outro
  if(claw.classList.contains('move-right')) { // se a garra contem a classe "move-right"
    moveLeft(); // chama a funcao de moveLeft()
  } else {
    moveRight(); // chama a funcao de moveRight()
  }

  generateAlphabet(); // regenero o alfabeto com os wrong guesses atuais
}

function fillLetter(letter) { // funcao chamada ao acertar uma letra
  var remainingLetters = 0; // quantidade inicial de underlines
  rightGuesses.push(letter); // adiciono a letra correta no array rightGuesses
  wordsElem.innerHTML = ''; // limpo o elemento words / para prevenir que append tudo novamente

  for(var i = 0; i < selectedWord.length; i++) { // faz o loop por cada letra do selectedWord

    var li = document.createElement('LI'); // crio elemento <li> da letra
    
    if(selectedWord[i] == '-') { // se a letra atual for traço, mudar para espaço
      li.innerHTML = ' '; // muda para espaço
    } else {
      
      if(rightGuesses.indexOf(selectedWord[i]) > -1 ) { // se a letra atual estiver no rightGuesses
        li.innerHTML = selectedWord[i]; // se sim, adiciona a letra no <li>
      } else {
        li.innerHTML = '_'; // se não, mantém o underline
        remainingLetters++; // os underlines que faltam para finalizar a palavra (os alert la)
      }

    }
    wordsElem.appendChild(li); // adiciona o <li> no <ul> de letras
  }


  // ACERTO MIZERAVI
  if(remainingLetters == 0) { // se não existir mais nenhum underline na palavra
    console.log('GANHOU...'); // GANHOU
    alphabetElem.style.display = 'none'; // esconde o alfabeto
    moveDown(); // a garra desce
    setTimeout(clawRight, 1000); // depois de 1 segundo ela sobe com o alien
    setTimeout(function(){
      restartBtn.style.display = 'block'; // depois de 3.5 segundos, aparece o botao restart
    }, 3500);
  }  
}