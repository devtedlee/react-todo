import { useState } from 'react';

function fetchTodos() {
  const result = [];
  for (let i = 0; i < localStorage.length; i++) {
    const value = localStorage.key(i);
    result.push(value);
  }

  return result;
}

function App() {
  const [inputText, setInputText] = useState('');
  const [todos, setTodos] = useState(fetchTodos());

  const handleInput = (event) => {
    const value = event.target.value;
    setInputText(value);
  }

  const handleClick = () => {
    localStorage.setItem(inputText, inputText);
    setTodos((currentTodos) => [...currentTodos, inputText]);
    setInputText('');
  }

  const handleRemove = (todo, index) => {
    const result = todos.filter(todoItem => todoItem !== todo);
    setTodos(result);
    localStorage.removeItem(todo);
  }

  return (
    <div>
      <h1>Ted TODO 앱</h1>
      <div>
        <input type="text" value={inputText} onChange={handleInput}/>
        <button onClick={handleClick}>추가</button>
      </div>
      <div>
        <ul>
          {todos.map((todo, index) => {
              return (
              <li key={index}>
                <span>{todo}</span>
                <button onClick={() => handleRemove(todo, index)}>삭제</button>
              </li>
              )
            })
          }
        </ul>
      </div>
    </div>
  )
}

export default App
