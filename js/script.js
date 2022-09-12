let board = document.querySelectorAll(".board button");
let isActive = false;
let counter = 0;
const player1 = document.querySelector('.player1');
const player2 = document.querySelector('.player2');
let activePlayer = player1;

const startPositions = '012-345-678-036-147-258-048-246' 
let winner = '012-345-678-036-147-258-048-246' 


console.log(winner);



for (let i = 0; i < board.length; i++) { 
  board[i].addEventListener('click', (event) => {
    event.preventDefault();
    
    let jugadorActual = actualPlayer();
    if(jugadorActual == 1){  
      movement(i,jugadorActual,'X')
    } else if(jugadorActual == 2) { 
        movement(i,jugadorActual,'O')
    } else {
        console.log('No funcionó');
    }
  
    counter += 1; 
  })
}

function movement(i,jugadorActual,marca){ //función que 'pinta' c/ movimiento 
  board[i].innerText = marca;
  board[i].disabled = true; 
  board[i].style.color = 'white';
  winner = winner.replaceAll(i+'',marca)    
  if(winner.indexOf(marca+marca+marca) > -1){
    console.log(jugadorActual+' wins!!!')
    activePlayer.querySelector('.wrapper-icon').className += " winner"
    document.querySelector('.w-win').className += " wins"
    disabledButtons(true);
  }else{
    if ( jugadorActual == 1 ){
      player2.className += " activePlayer";
      player1.classList.remove("activePlayer")
      activePlayer = player2;
    }else {
      player1.className += " activePlayer";
      player2.classList.remove("activePlayer")
      activePlayer = player1;
    }
    if(counter == 8){ //si se llena el tablera con las 8 posiciones 
      document.querySelector('.w-losers').className += " losers" //se pintará el anuncio losers
    }
  }
  
}

function disabledButtons(disabled){ //función para deshabilitar botones cuando alguien gane
  for (let i = 0; i < board.length; i++) {
    board[i].disabled = disabled;
  }
}

function actualPlayer ()  { //función para saber si el actual player es el 1 o el 2
  if ( counter%2 == 0 ){  //el jugador 1 siempre tendrá su turno en números impares
    return 1;
  }else {
    return 2;
  }
}


//reset button
function reset(){ //resetear juego
  for (let i = 0; i < board.length; i++) {
    board[i].innerText = ''; //se sustituye con campos vacíos 
    board[i].disabled = false; //se habilita el board
  }
  winner = startPositions; //el str de posiciones se reinicia
  counter = 0;              //el contador se reinicia 
  activePlayer.querySelector('.wrapper-icon').classList.remove("winner") //se quita el color verde del ganador
  document.querySelector('.w-win').classList.remove("wins")             // se quita el anuncio wins
  document.querySelector('.w-losers').classList.remove("losers")        // se quita el anuncio losers
  player1.className += " activePlayer";                                  //se vuelve a hacer el scale en el jugador 1
  player2.classList.remove("activePlayer")
  activePlayer = player1;
}

document.getElementById('reset').addEventListener('click', (event) => {
  event.preventDefault();
  reset();
})

