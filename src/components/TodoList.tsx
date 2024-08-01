import React, { Component } from 'react'
import Todo from './Todo'
import {observer} from 'mobx-react'
import todostore from '../store/Todostore'

@observer
class TodoList extends Component {
  render() {

    return (
      <ul>

        {todostore.todos.map((todo) => 
        <li key = {todo.id}>
        <span className = 
        {todo.isCompleted ? 'todo-completed' : ''}>
        {todo.text} </span>
        <Todo
        id = {todo.id}
        key = {todo.id}
        text = {todo.text}
        isCompleted = {todo.isCompleted}
        /></li>)}
       
      </ul>
    )
  }
}

export default TodoList
