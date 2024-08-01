import React, { Component } from 'react'
import TodoInput from './components/TodoInput';
import TodoList from './components/TodoList';
import './App.css';
import {observer} from 'mobx-react'


@observer
class App extends Component {
  render() {
    return (
      <div className="header">
        <h1> <span className = "title-to">To</span>
        <span className = "title-do">Do</span></h1>
        <p>Organize your tasks</p>
        <TodoInput/>
        <TodoList/>
      </div>
    )
  }
}

export default App;