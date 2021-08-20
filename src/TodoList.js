import React from 'react'
import Card from '@material-ui/core/Card';
import ACTIONS from './App';

import './TodoList.css'
import { Button, CardContent, CardActions } from '@material-ui/core';

export default function TodoList({ todos, dispatch }) {
    function handleToggel(todo) {
        console.log(todo);
        dispatch({ type: ACTIONS.TOGGLE_TODO, payload: { id: todo } })
    }
    return (
        <div className="todolist">
            {todos.map(todo => {
                var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
                let date = new Date(todo.id).toLocaleDateString("hi-IN", options)
                return (
                    <Card key={todo.id} className="todo">
                        <CardContent>
                            <p>{date}</p>
                            <h2>{todo.title}</h2>
                        </CardContent>
                        <CardActions>
                            <Button onClick={() => handleToggel(todo.id)} size="small" >{todo.complete ? 'Completed' : 'Not done'}</Button>
                            <Button size="small" >Delete</Button>
                        </CardActions>
                    </Card>
                )
            })}
        </div>
    )
}
