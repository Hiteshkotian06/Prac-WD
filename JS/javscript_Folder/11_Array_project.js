const listArray = [];


function addList(){
  const inputELement = document.querySelector('.textBox');
  const doListValue = inputELement.value;
  console.log(doListValue);

  if(doListValue){
    listArray.push(doListValue);
    inputELement.value = '';

    let htm = '';
    for (i = 0; i < listArray.length; i++){
      htm += `<p>${listArray[i]}</p>`;
      document.querySelector('.doListPara').innerHTML = htm;
  }
}
  // console.log(listArray);
  // listArray.push(doListValue);
  // document.querySelector('.doListPara').innerHTML = listArray.toString();

}

function enterKeyWord(event){
  if(event.key === 'Enter'){
    addList(event);
  }
}

