const listArray = JSON.parse(localStorage.getItem('storeage')) || [];

function toDoList(){
  const workName = document.querySelector('.textBox').value;
  const dueDate = document.querySelector('.date').value;

  listArray.push({
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
    for(i=0; i <listArray.length; i++){

      const listArrayObject = listArray[i];

    // const workName = listArray.workName
    // const dueDate = listArray.dueDate; shorthand - shortcut for same name 

    const { workName, dueDate} = listArrayObject;

      htm += 
      `<div class="workNameClass">${workName}</div>
      <div class="dueDateClass">${dueDate}</div>
      <button class="deleteList"
      onclick="listArray.splice(${i},1);
      renderList()">Delete</button>`
    }
    var paraValue = document.querySelector('.listPara')
    paraValue.innerHTML = htm;

    localStorage.setItem('storeage', JSON.stringify(listArray));
  }


renderList();