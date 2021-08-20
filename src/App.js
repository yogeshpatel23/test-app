import { Button, Input } from '@material-ui/core';
import React, { useState, useRef, useReducer } from 'react'
import './App.css';
import TodoList from './TodoList';

export const ACTIONS = {
  ADD_TODO: 'add-todo',
  TOGGLE_TODO: 'toggle-todo',
  DELETE_TODO: 'delete-todo',
}

function reducer(todos, action) {
  switch (action.type) {
    case ACTIONS.ADD_TODO:
      return [...todos, { id: Date.now(), title: action.payload.title, complete: false }]

    case ACTIONS.TOGGLE_TODO:
      return todos.map(todo => {
        if (todo.id === action.payload.id) {
          return { ...todo, complete: !todo.complete }
        }
        return todo
      })

    default:
      break;
  }
}

function App() {
  // const [todos, setTodos] = useState([])
  const [todos, dispatch] = useReducer(reducer, [])
  const todoTitleRef = useRef()

  function handleAddTodo() {
    const title = todoTitleRef.current.value
    dispatch({ type: ACTIONS.ADD_TODO, payload: { title: title } })
    todoTitleRef.current.value = null
  }



  return (
    <div className="app">
      <Input inputRef={todoTitleRef} label="Title" />
      <Button onClick={handleAddTodo} variant="contained" color="primary">Add</Button>
      <TodoList todos={todos} dispatch={dispatch} />
    </div>
  );
}

export default App;
