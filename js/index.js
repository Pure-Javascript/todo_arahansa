
class Todo{
  constructor(subject, content="", checked=false) {
    this.subject = subject;
    this.content = content;
    this.checked = checked
  }
}

const todos = [
  new Todo("Hit the gym"),
  new Todo("Pay bills"),
  new Todo("Meet George", "", true),
  new Todo("Buy eggs"),
  new Todo("Read a book"),
  new Todo("Organize office"),
];

const loadTodos = () => {
  document.getElementById("myUL").innerHTML = todos.map((todo)=>`<li>${todo.subject}</li>`).join(' ');
};
loadTodos();

document.getElementById("addTodo").addEventListener("click", ()=>{
  console.log("hi");
  const subject = document.getElementById("myInput").value;
  const content = document.getElementById("todo-content").value;
  todos.push(new Todo(subject, content));
  loadTodos();
});

