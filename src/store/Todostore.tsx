import {observable, action} from 'mobx'
import {v4 as uuidv4} from 'uuid';

interface todo{
    id : string 
    text : string 
    isCompleted : boolean
  }
  
  
class Todostore {

  constructor(){
    this.loadtodos()
  }

  @observable todos : todo[] = [] // todos : name of property being defined and it represents an array of todo // = []; initializes todos array to an empty array 
  //@observable decorator makes the todo array observable , when array is modified , MObx will notify any observers that depend on this data 

  @action 
  pushToArray = (newTodo : todo ) => {
     this.todos.push(newTodo);
     this.savetodos(); //saves updated todos to LocalStorage 
     console.log(`Array updated`, this.todos) 
  }
  
  @action
  onButtonClicked = (newTodo : string) => { //onButtonClicked expects a parameter of type string ( a text entered by the user )
    console.log(newTodo)
    
    this.pushToArray({
      id : uuidv4() , //provide global unique IDs (Universally unique identifiers)
      text : newTodo,
      isCompleted : false
    }) //calls the method pushToArray //pushtoarray expects a parameter todo object which it adds to the array 
  }

  @action
  onTodoDelete = (id : string) =>{
    this.todos = this.todos.filter(todo => todo.id !== id)
    this.savetodos();//save updated todos to localStorage
      //todos : .... new state of the new array 
  } //filter method creates a new array containing elements that pass the condition : todo => todo.id !== id 

  @action
  onTodoToggle = (id : string) => {
    this.todos = this.todos.map(todo => //map method creates a new array based on the old array where each item is processed 
      todo.id === id ? {...todo, isCompleted : !todo.isCompleted} : todo //if id's match , a new object is created with {...todo, isCompleted : !todo.isCompleted} , if not the old todo is returned back 
    )
    this.savetodos()//saves updated todos to localStorage
  }

  savetodos = () => {
    localStorage.setItem('todos', JSON.stringify(this.todos)) //converts the current todo's array into JSON strings , and stores it in localStorage under key 'todos'
  }

  loadtodos = () => {
    const oldtodos = localStorage.getItem('todos') //retrieves value associated to the key 'todos' . if key 'todos' exist , it returns a string , else it returns null
    if(oldtodos){ // string is truthy 
      this.todos = JSON.parse(oldtodos)//converts JSON string ('oldtodos') into a js array of todos 
    }else { //null is falsy
      this.todos = [] //no todos were previously saved ( null ), returns an empty array 
    }
  }

}

const todostore = new Todostore()
export default todostore //a new instance is created and exported because we want every component to do the same store ( Single Source of truth )

//@observables : this is the state that Mobx tracks , todo's array is made observable , when a change is made , Mobx knows about it 
//@actions : these are the functions that modify the state 
//after an observable is modified , mobx notifies all components (observers) that depend on this observable state. 
//components that use the todo array will automatically update to reflect the changes 

//"Actions get called (state changes) -> MobX gets notified through observable -> MobX notifies observers to use that state"

//if there is a component that uses a local state , then the component should manage its own state . The goal of Mobx is not to control the state of the whole application 
//, but to centralize shared state in the store while keeping local component , local
