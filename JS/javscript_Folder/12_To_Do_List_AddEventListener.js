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

// Removing the onclick Here we will fetch class and add EventListener
document.querySelector('.to-do-List').addEventListener('click', () => {toDoList()})


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
      <button class="deleteList to-do-List-delete">Delete</button>`
    });

    var paraValue = document.querySelector('.listPara')
    paraValue.innerHTML = htm;

    // THis below code is written for Delete button here we had 2 problem 
    // 1- as we wrote for Add similarly we couldnt do for delete as it is not html just the string it is added in the html
    // after the above line paraValue.innerHtml thats why wrote here 
    // 2- All the delete button will have same class thus use All and then use forEach
    document.querySelectorAll('.to-do-List-delete').forEach((deleteButton, index) => {
      deleteButton.addEventListener('click', () => {
        newListArray.splice(index,1);
        renderList()
      })
    })

    localStorage.setItem('newStoreage', JSON.stringify(newListArray));
  }


renderList();