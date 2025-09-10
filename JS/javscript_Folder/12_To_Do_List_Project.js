const newListArray = JSON.parse(localStorage.getItem('newStoreage')) || [];

function toDoList(){
  const workName = document.querySelector('.textBox').value;
  const dueDate = document.querySelector('.date').value;

  newListArray.push({
    // workName : workName, 
    // dueDate:dueDate, --key and value have same name so can use this shortcut as below
    workName,
    dueDate
  });

  document.querySelector('.textBox').value = '';  
  document.querySelector('.date').value = '';

  renderList();
}


  function renderList(){

    htm = '';

    // Here we wont use the for loop but the forEach and it works in the same way as in the For Loop
    newListArray.forEach( function(newListArrayObject, index) {

      // const workName = newListArray.workName
      // const dueDate = newListArray.dueDate; shorthand - shortcut for same name 

      const { workName, dueDate} = newListArrayObject;

      htm += 
      `<div class="workNameClass">${workName}</div>
      <div class="dueDateClass">${dueDate}</div>
      <button class="deleteList"
      onclick="newListArray.splice(${index},1);
      renderList()">Delete</button>`
    });

    var paraValue = document.querySelector('.listPara')
    paraValue.innerHTML = htm;

    localStorage.setItem('newStoreage', JSON.stringify(newListArray));
  }


renderList();