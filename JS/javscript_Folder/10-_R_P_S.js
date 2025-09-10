let Scores = JSON.parse(localStorage.getItem('Scores')) ||
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
        Scores.Draw ++;
      } else if (userGuess === 'Rock' && computerValue === 'Scissor' ||
        userGuess === 'Paper' && computerValue === 'Rock' ||
        userGuess === 'Scissor' && computerValue === 'Paper'
      ) {
        result = 'Win';
        Scores.Win ++;

      } else{
        result = 'Loss';
        Scores.Loss ++;
      }

      document.querySelector('#Comp_Guess').innerHTML=` Your Guess : <img src =/Image/${userGuess}.webp class="emote">
      Computer Guessed : <img src =/Image/${computerValue}.webp class="emote">`;
      document.querySelector('#Result').innerHTML=`You ${result}`;


      localStorage.setItem('Scores', JSON.stringify(Scores));

      document.querySelector('#finalScore').innerHTML = `Win : ${Scores.Win}, Draw : ${Scores.Draw}, Loss : ${Scores.Loss}` ;
    }

    function resetButton(){
      Scores = {Win :0, Loss: 0, Draw : 0};
      localStorage.removeItem('Scores');
      localStorage.setItem('Scores', JSON.stringify(Scores));
      document.querySelector('#finalScore').innerHTML = `Win : ${Scores.Win}, Draw : ${Scores.Draw}, Loss : ${Scores.Loss}
      ` ;
      document.querySelector('#Comp_Guess').innerHTML=``;
      document.querySelector('#Result').innerHTML=``;
    }
