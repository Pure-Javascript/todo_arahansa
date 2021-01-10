class Todo{
  constructor(subject, content="", checked=false) {
    this.subject = subject;
    this.content = content;
    this.checked = checked;
  }
}

let todos = [];

const saveTodos = () => {
  localStorage.setItem("todos", JSON.stringify(todos));
}

const loadTodos = () => {
  console.log("load todos :", todos);
  document.getElementById("todo-list").innerHTML =
      todos.map((todo, index)=>`
            <li class="item-todo collapse dropzone" draggable="true" data-index="${index}">
                <div class="wrap-subject">
                    <input type="checkbox" class="chk-complete" ${todo.checked ? 'checked' : ''} />
                    <span class="todo-subject ${todo.checked ? 'checked' : ''}">${todo.subject}</span>
                    <div class="buttons">
                        <button class="evt-edit">수정</button>
                        <button class="evt-delete">삭제</button>
                    </div>
                </div>
                <div class="content">${todo.content}</div>
            </li>
      `).join(' ');
};

const initLoadTodo = () =>{
  const localTodos = localStorage.getItem("todos");
  console.log("localtodos :", localTodos);
  if(localTodos === null){
    todos.push(new Todo("Hit the gym", "test"),
        new Todo("Pay bills", "test"),
        new Todo("Meet George", "test", true),
        new Todo("Buy eggs", "test"),
        new Todo("Read a book", "test"),
        new Todo("Organize office", "test"));
  }else{
    todos = JSON.parse(localTodos);
  }
  loadTodos();
};

initLoadTodo();


function initForm(subject="", content="", editId=""){
  const elemSubject = document.getElementById("myInput");
  const elemContent = document.getElementById("todo-content");
  elemSubject.value = subject;
  elemContent.value = content;
  document.getElementById("edit-id").value = editId;
}

function formToTodoObj(){
  const subject = document.getElementById("myInput").value;
  const content = document.getElementById("todo-content").value;
  const id = document.getElementById("edit-id").value;
  return {
    id, subject, content
  }
}

document.getElementById("addTodo").addEventListener("click", ()=>{
  const todo = formToTodoObj();
  // TODO validation
  todos.push(new Todo(todo.subject, todo.content));
  saveTodos();
  initForm();
  loadTodos();
});


function removeByIndex(array, index) {
  if (index !== -1) {
    array.splice(index, 1);
  }
}

function recoverForm(){
  // removeClass(document.getElementById("wrap-form"), "edit");
  document.getElementById("wrap-form").classList.remove("edit")
  initForm();
}

document.getElementById("cancel-edit").addEventListener("click", recoverForm);

document.getElementById("submit-edit").addEventListener("click", ()=>{
  const todo = formToTodoObj();
  // todo validation
  todos[todo.id].subject = todo.subject;
  todos[todo.id].content = todo.content;
  saveTodos();
  loadTodos();
  recoverForm();
});

document.addEventListener("click", function(event) {
  event.preventDefault();
  console.log("이벤트 클릭?", event.target);
  const buttons = event.target.closest(".buttons");
  const collapse = event.target.closest(".collapse");
  console.log("컬랩스? :", collapse);
  // 체크박스
  if(event.target.className.includes("chk-complete")){
    const index = collapse.getAttribute('data-index');
    todos[index].checked = event.target.checked;
    loadTodos();
    return;
  }
  // 버튼 액션
  if(buttons != null){
    if(event.target.className.includes("evt-edit")){
      const index = collapse.getAttribute('data-index');
      initForm(todos[index].subject, todos[index].content, index);
      document.getElementById("wrap-form").className += " edit";
      document.getElementById("myInput").focus();
    }else if(event.target.className.includes("evt-delete")){
      if(confirm("정말 삭제하겠습니까?")){
        const index = collapse.getAttribute('data-index');
        removeByIndex(todos, index);
        saveTodos();
        loadTodos();
      }
    }
    return;
  }

  // 콜랩스
  if(collapse!= null){
    if(collapse.classList.contains("on")){
      console.log("온 ?", collapse.className);
      collapse.classList.remove("on");
    }else{
      collapse.className += " on";
    }
  }
});

// ----
let dragged;

/* events fired on the draggable target */
document.addEventListener("drag", function(event) {

}, false);

document.addEventListener("dragstart", function(event) {
  console.log("음?");
  // store a ref. on the dragged elem
  dragged = event.target;

  // make it half transparent
  dragged.style.opacity = .5;
}, false);

document.addEventListener("dragend", function(event) {
  // reset the transparency
  event.target.style.opacity = "";
}, false);

/* events fired on the drop targets */
document.addEventListener("dragover", function(event) {
  // prevent default to allow drop
  event.preventDefault();
}, false);

document.addEventListener("dragenter", function(event) {
  console.log("drag enter?", event.target);
  // highlight potential drop target when the draggable element enters it
  if (event.target.classList.contains("dropzone")) {

    event.target.style.borderBottom = " 2px solid black";
  }

}, false);

document.addEventListener("dragleave", function(event) {
  // reset background of potential drop target when the draggable element leaves it
  if (event.target.classList.contains("dropzone")) {

    event.target.style.borderBottom = "";
  }

}, false);

document.addEventListener("drop", function(event) {
  // prevent default action (open as link for some elements)
  event.preventDefault();
  // move dragged elem to the selected drop target
  if (event.target.classList.contains("dropzone")) {
    event.target.style.borderBottom = "";
    dragged.parentNode.removeChild( dragged );
    event.target.after( dragged );
    const targetIndex = event.target.getAttribute("data-index");
    const draggedIndex = dragged.getAttribute("data-index");
    dragged.setAttribute("data-index", targetIndex);
    event.target.setAttribute("data-index", draggedIndex);
    const tempTodo = todos[targetIndex];
    todos[targetIndex] = todos[draggedIndex];
    todos[draggedIndex] = tempTodo;
    saveTodos();
  }
}, false);


