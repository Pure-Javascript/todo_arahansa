
class Todo{
  constructor(subject, content="", checked=false) {
    this.subject = subject;
    this.content = content;
    this.checked = checked;
  }
}

const todos = [
  new Todo("Hit the gym", "test"),
  new Todo("Pay bills", "test"),
  new Todo("Meet George", "test", true),
  new Todo("Buy eggs", "test"),
  new Todo("Read a book", "test"),
  new Todo("Organize office", "test"),
];

const loadTodos = () => {
  document.getElementById("todo-list").innerHTML =
      todos.map((todo, index)=>`
            <li id="todo-${index}" class="item-todo collapse" data-index="${index}">
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
loadTodos();

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
  initForm();
  loadTodos();
});

const removeClass = (element, name) => {
  const pattern = new RegExp('(?:^|\\s)'+ name + '(?:\\s|$)', 'g');
  element.className = element.className.replace(pattern, "");
};

function remove(array, element) {
  const index = array.indexOf(element);
  if (index !== -1) {
    array.splice(index, 1);
  }
}

function removeByIndex(array, index) {
  if (index !== -1) {
    array.splice(index, 1);
  }
}

function recoverForm(){
  removeClass(document.getElementById("wrap-form"), "edit");
  initForm();
}

document.getElementById("cancel-edit").addEventListener("click", recoverForm);

document.getElementById("submit-edit").addEventListener("click", ()=>{
  const todo = formToTodoObj();
  // todo validation
  todos[todo.id].subject = todo.subject;
  todos[todo.id].content = todo.content;
  loadTodos();
  recoverForm();
});

document.addEventListener("click", function(event) {
  event.preventDefault();
  const buttons = event.target.closest(".buttons");
  const collapse = event.target.closest(".collapse");
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
        loadTodos();
      }
    }
    return;
  }

  // 콜랩스
  if(collapse!= null){
    if(collapse.className.includes("on")){
      removeClass(collapse, "on");
    }else{
      collapse.className += " on";
    }
  }
});
