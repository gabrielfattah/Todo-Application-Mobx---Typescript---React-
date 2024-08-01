import React, { Component , ChangeEvent } from 'react' //ChangeEvent is a type provided by React Library for typescript 
import todostore from '../store/Todostore'



interface TodoInputProps{

}

interface TodoInputState{
  todoText : string
} //structure of the component's state is defined here 


class TodoInput extends Component <TodoInputProps, TodoInputState>{ //class TodoInput extends React's component and it uses props and state interfaces earlier 

  constructor(props : TodoInputProps){
    super(props);

    this.state = {
      todoText: '' //The state of the component is initialised here . todoText starts as an empty string here 
    }
  }

  //Event Handling : 
  //When user types into the input field , the input value is handled using event handlers 
  //handleInputChange is an arrow function that takes a single parameter (event) 
  //which represents the event that occured when user typed into the input field 

  handleOnChange = (event: ChangeEvent<HTMLInputElement>) => { //event is an object that contains information about what happened 
    this.setState({
      todoText : event.target.value //event.target.value is the current value of the input field ( what the user has typed )
    })
  }


  render() {
    return (
      <div className = "todoinput">
        <input
        type = 'text' placeholder = "Write your task"
        value = {this.state.todoText} //value is controlled by this.state.todoText
        onChange = {this.handleOnChange} //input value is updated through here 
        />
        <button onClick = { () => todostore.onButtonClicked(this.state.todoText)}>Add Item</button>
      </div>
    )
  }
}


export default TodoInput;

