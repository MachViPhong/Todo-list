var arrTaskTodo = [];
var arrTaskCompleted = [];
getLocalStorage();
//add Task
document.querySelector("#addItem").onclick = function () {
  var task = new Task();
  task.id = Math.random();
  task.name = document.querySelector("#newTask").value;
  task.status = "todo";
  const arrTaskToTal = [...arrTaskTodo, ...arrTaskCompleted];
  var valid = true;
  valid = validation.isEmpty(task.name, "notiInput", "Tên task");
  valid &= validation.isExists(
    task.name,
    "notiExistTaskName",
    "Task",
    arrTaskToTal
  );
  if (!valid) {
    return;
  }
  arrTaskTodo.push(task);
  //   console.log(arrTaskTodo[0].status);
  setLocalStorage();
  renderTaskTodo(arrTaskTodo);
  document.querySelector("#newTask").value = "";
};

//render task todo
function renderTaskTodo(arrTaskTodo) {
  var contentHTML = "";
  for (var index = 0; index < arrTaskTodo.length; index++) {
    var arrIndex = arrTaskTodo[index];
    contentHTML += `
        <li>
            <span>${arrIndex.name}</span>
            <div class="buttons">
                <button class="remove" onclick="deleteTask(${arrIndex.id}, '${arrIndex.status}')">
                    <i class="fa fa-trash-alt"></i>
                </button>
                <button class="complete" onclick="updateTask(${arrIndex.id}, '${arrIndex.status}')">
                    <i class="far fa-check-circle"></i>
                    <i class="fas fa-check-circle"></i>
                </button>
            </div>
        </li>            
        
    `;
  }
  document.getElementById("todo").innerHTML = contentHTML;
}

function deleteTask(taskId, status) {
  if (status === "todo") {
    var index = arrTaskTodo.findIndex((task) => task.id === taskId);
    if (index !== -1) {
      arrTaskTodo.splice(index, 1);
      setLocalStorage();
      renderTaskTodo(arrTaskTodo);
    }
  } else if (status === "completed") {
    var index = arrTaskCompleted.findIndex((task) => task.id === taskId);
    if (index !== -1) {
      arrTaskCompleted.splice(index, 1);
      setLocalStorage();
      renderTaskCompleted(arrTaskCompleted);
    }
  }
}

//add TaskCompleted
function renderTaskCompleted(arrTaskCompleted) {
  var contentHTML = "";
  for (var index = 0; index < arrTaskCompleted.length; index++) {
    var arrIndex = arrTaskCompleted[index];
    contentHTML += `
        <li>
            <span>${arrIndex.name}</span>
            <div class="buttons">
                <button class="remove" onclick="deleteTask(${arrIndex.id}, '${arrIndex.status}')">
                    <i class="fa fa-trash-alt"></i>
                </button>
                <button class="complete" onclick="updateTask(${arrIndex.id}, '${arrIndex.status}')">
                    <i class="far fa-check-circle"></i>
                    <i class="fas fa-check-circle"></i>
                </button>
            </div>
        </li>
    `;
  }
  document.getElementById("completed").innerHTML = contentHTML;
}

function updateTask(taskId, status) {
  if (status === "todo") {
    var index = arrTaskTodo.findIndex((task) => task.id === taskId);
    if (index !== -1) {
      var newTask = new Task();
      newTask.id = taskId;
      newTask.name = arrTaskTodo[index].name;
      newTask.status = "completed";
      arrTaskTodo.splice(index, 1);
      arrTaskCompleted.push(newTask);
      setLocalStorage();
      renderTaskTodo(arrTaskTodo);
      renderTaskCompleted(arrTaskCompleted);
      
    }
  } else if (status === "completed") {
    var index = arrTaskCompleted.findIndex((task) => task.id === taskId);
    if (index !== -1) {
      var newTask = new Task();
      newTask.id = taskId;
      newTask.name = arrTaskCompleted[index].name;
      newTask.status = "todo";
      arrTaskCompleted.splice(index, 1);
      arrTaskTodo.push(newTask);
      setLocalStorage();
      renderTaskTodo(arrTaskTodo);
      renderTaskCompleted(arrTaskCompleted);
    }
  }
}

function setLocalStorage() {
  var stringArrTaskTodo = JSON.stringify(arrTaskTodo);
  var stringArrTaskCompleted = JSON.stringify(arrTaskCompleted);

  localStorage.setItem("arrTaskTodo", stringArrTaskTodo);
  localStorage.setItem("arrTaskCompleted", stringArrTaskCompleted);
}

function getLocalStorage() {
  if (localStorage.getItem("arrTaskTodo")) {
    var stringArrTaskTodo = localStorage.getItem("arrTaskTodo");
    arrTaskTodo = JSON.parse(stringArrTaskTodo);
    console.log(arrTaskTodo);
    renderTaskTodo(arrTaskTodo);
  }
  if (localStorage.getItem("arrTaskCompleted")) {
    var stringArrTaskCompleted = localStorage.getItem("arrTaskCompleted");
    arrTaskCompleted = JSON.parse(stringArrTaskCompleted);
    console.log(arrTaskCompleted);
    renderTaskCompleted(arrTaskCompleted);
  }
}
