import React, { Component } from 'react'
import {observer} from 'mobx-react'
import todostore from '../store/Todostore'
import TrashIcon from '../icons/TrashIcon'


interface TodoProps {
  id : string 
  text : string 
  isCompleted : boolean
}
@observer
class Todo extends Component <TodoProps> {

  handleCheckbox = () => {
    todostore.onTodoToggle(this.props.id)
  }
  
  render() {
    return (
      <div className = "todo-item">
        <button className = "delete-icon" onClick = {() => todostore.onTodoDelete(this.props.id)}>
          <TrashIcon/>
          </button>
        <label>
        <input
        className = "check-box"
        type = "checkbox"
        checked = {this.props.isCompleted}
        onChange ={this.handleCheckbox}/>
        <span className="custom-checkbox"> </span>
        </label>
        </div>
    )
  }
}

export default Todo
