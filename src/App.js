import { useState } from "react";
import "./App.css";
import { data } from "./data";
function App() {
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState(data);
  const [filter, setFilter] = useState("all");

// INPUT text
  const handleSubmit = (e) => {
    e.preventDefault();
   setTodos([...todos, {
    id: Math.floor(Math.random() * 10000),
    text: input,
    isCompleted: false,
   }]);
   setInput(' ');
  }
//CHANGE THEME 
const toggleTheme = () => {
  const app = document.querySelector(".App");
  app.classList.toggle("dark")
}
//REMOVE TODO
const handleRemoveTodo = (id) => {
  const newTodos = todos.filter((todo) => todo.id !== id);

  setTodos(newTodos);
};
//COMPLETED TODO
const handleCompleted = (id) => {
  const newTodos = todos.map((todo) => {
    if (todo.id === id) {
      todo = { ...todo, isCompleted: !todo.isCompleted };
    }
    return todo;
  });

  setTodos(newTodos);
};
//CLEAR COMPLETED
const clearCompleted = () => {
  const newTodos = todos.filter((todo) => todo.isCompleted === false);

  setTodos(newTodos);
};
  return (
    <div className="App">
      <header className="header">
      <div className="container">
        <div className="title">
          <h1>Todo</h1>
          <button className="btn" onClick={toggleTheme}></button>
        </div>
        <div className="todo-form">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="text"
              id="todo-form-input"
              placeholder="Create a new todo"
              onChange={(e) => setInput(e.target.value)}
              value={input}
            />
          </form>
        </div>
      </div>
    </header>
    <main className="container app-container">
      <div className="todo-list">
        {todos
          .filter((todo) => {
            if (filter === "all") return todo;
            if (filter === "active") {
              if (!todo.isCompleted) {
                return todo;
              }
            }
            if (filter === "completed") {
              if (todo.isCompleted) {
                return todo;
              }
            }
          })
          .map((todo, index) => {
            return (
              <div className="todo-container">
                <div className="todo" key={index}>
                  <input
                    id={todo.id}
                    type="checkbox"
                    className="custom-checkbox"
                    checked={todo.isCompleted ? true : false}
                    onChange={() => handleCompleted(todo.id)}
                    value={todo.isCompleted}
                  />
                  <label
                    className="text-todo"
                    key={todo.id}
                  >
                    {todo.text}
                  </label>
                </div>
                <button
                  className="btn"
                  onClick={() => handleRemoveTodo(todo.id)}
                ></button>
              </div>
            );
          })}
      </div>
      <div className="todo-list-footer">
        <p>
          {todos.filter((todo) => todo.isCompleted === false).length}
          &nbsp;items left{" "}
        </p>
        <button className="btn" onClick={clearCompleted}>
          Clear Completed
        </button>
      </div>
    </main>
    <footer>
      <div className="filters container">
        <button
          className={`btn ${filter === "all" && "active"}`}
          onClick={() => setFilter("all")}
        >
          All
        </button>
        <button
          className={`btn ${filter === "active" && "active"}`}
          onClick={() => setFilter("active")}
        >
          Active
        </button>
        <button
          className={`btn ${filter === "completed" && "active"}`}
          onClick={() => setFilter("completed")}
        >
          Completed
        </button>
      </div>
    </footer>
    </div>
  );
}

export default App;
