let addEventListnerScores = JSON.parse(localStorage.getItem('addEventListnerScores')) ||
{
  Win :0, Loss: 0, Draw : 0
};

function Guess(){  
  let computerGuess = '';
  let number = Math.random();
  if (number <1/3 ){
    computerGuess = 'Rock';
  } else if (number >1/3 && number < 2/3){
    computerGuess = 'Paper';
  } else {
    computerGuess = 'Scissor'
  }
  return computerGuess;
}



function Result(userGuess){
  computerValue = Guess();
  let result = '';
  if (computerValue === userGuess){
    result = 'Draw';
    addEventListnerScores.Draw ++;
  } else if (userGuess === 'Rock' && computerValue === 'Scissor' ||
    userGuess === 'Paper' && computerValue === 'Rock' ||
    userGuess === 'Scissor' && computerValue === 'Paper'
  ) {
    result = 'Win';
    addEventListnerScores.Win ++;

  } else{
    result = 'Loss';
    addEventListnerScores.Loss ++;
  }

  document.querySelector('#Comp_Guess').innerHTML=` Your Guess : <img src =/Image/${userGuess}.webp class="emote">
  Computer Guessed : <img src =/Image/${computerValue}.webp class="emote">`;
  document.querySelector('#Result').innerHTML=`You ${result}`;


  localStorage.setItem('addEventListnerScores', JSON.stringify(addEventListnerScores));

  document.querySelector('#finalScore').innerHTML = `Win : ${addEventListnerScores.Win}, Draw : ${addEventListnerScores.Draw}, Loss : ${addEventListnerScores.Loss}` ;
}


// Below we cant directly use Result('') bcoz it will give undefined value thus we use function inside function
document.querySelector('.js-rock-button').addEventListener('click', () => {Result('Rock')});

document.querySelector('.js-paper-button').addEventListener('click', () => {Result('Paper')});

document.querySelector('.js-scissor-button').addEventListener('click', () => {Result('Scissor')});

// THis is for the Keyboard Shortcut 
document.body.addEventListener('keydown', (event) => {
  if(event.key === 'r'){
    Result('Rock')
  }
  else if (event.key === 'p'){
    Result('Paper')
  }
  else if (event.key === 's'){
    Result('Scissor')
  }
})


let isautoPlaying = false;
let intervalId;

function autoPlay() {
  const button = document.querySelector('.autoPlay')

  if(!isautoPlaying){
  intervalId = setInterval(function() {
    const userGuess = Guess();    // This is for userGuess we have to create which genreate a userguess
    Result(userGuess)     // Inside this we have guess for computer already
  }, 1000);
  isautoPlaying = true;
  button.innerHTML = "Stop AutoPlay";
  }}

function stopAutoPlay(){
  const button = document.querySelector('.autoPlay')
  if(isautoPlaying) {
    clearInterval(intervalId);
    isautoPlaying = false;
    button.innerHTML = "AutoPlay";
  }
}    

document.body.addEventListener('keydown', (event) => {
  if(event.key == 'a'){
    autoPlay();
  }
  else if (event.key == ' '){
    stopAutoPlay();
  }
})
    

// function resetButton(){
//   const confirmReset = confirm("Do you really want to reset the scores?");
//   if(confirmReset){
//     addEventListnerScores = {Win :0, Loss: 0, Draw : 0};
//     localStorage.removeItem('addEventListnerScores');
//     localStorage.setItem('addEventListnerScores', JSON.stringify(addEventListnerScores));
//     document.querySelector('#finalScore').innerHTML = `Win : ${addEventListnerScores.Win}, Draw : ${addEventListnerScores.Draw}, Loss : ${addEventListnerScores.Loss}` ;
//           document.querySelector('#Comp_Guess').innerHTML=``;
//     document.querySelector('#Result').innerHTML=``;
// } else {
//     // Optional: feedback if user cancels
//     console.log("Reset cancelled.");
//   }
// }

// Reset with Confirmation Box
function resetButton() {
  // show the confirmation box
  document.getElementById("overlay").style.display = "block";
  document.getElementById("confirmBox").style.display = "block";
}

// handle Yes/No clicks
document.getElementById("yesBtn").addEventListener("click", () => {
  addEventListnerScores = { Win: 0, Loss: 0, Draw: 0 };
  localStorage.removeItem('addEventListnerScores');
  localStorage.setItem('addEventListnerScores', JSON.stringify(addEventListnerScores));

  document.querySelector('#finalScore').innerHTML =
    `Win : ${addEventListnerScores.Win}, Draw : ${addEventListnerScores.Draw}, Loss : ${addEventListnerScores.Loss}`;
  document.querySelector('#Comp_Guess').innerHTML = ``;
  document.querySelector('#Result').innerHTML = ``;

  // ✅ hide overlay + box after reset
  document.getElementById("overlay").style.display = "none";
  document.getElementById("confirmBox").style.display = "none";
});

document.getElementById("noBtn").addEventListener("click", () => {
  // hide overlay + box if cancelled
  document.getElementById("overlay").style.display = "none";
  document.getElementById("confirmBox").style.display = "none";
});

document.body.addEventListener('keydown', (event) => {
  if (event.key === 'Backspace'){
    event.preventDefault(); // stops browser from navigating back
    resetButton();
  }
});

