//import logo from './logo.svg';
import './App.css';
import Header from "./My Components/Header";
import { Footer } from './My Components/Footer';
import { Todos } from './My Components/Todos';
import { AddTodo } from './My Components/AddTodo';
import { About } from './My Components/About';
import React, { useState , useEffect} from 'react';


import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

function App() {
  let initTodo
  if(localStorage.getItem("todos")===null){
    initTodo=[];
  }
  else
  {
    initTodo= JSON.parse(localStorage.getItem("todos"));
  }
  const onDelete = (todo) => {
    console.log("I am ondelete of todo", todo);
    // let index = todos.indexOf(todo);
    // todos.splice(index,1);
    setTodos(todos.filter((e) => {
      return e !== todo;
    }));
  /*  localStorage.getItem("todos");*/
  localStorage.setItem("todos", JSON.stringify(todos));
  }

  const addTodo =(title ,desc)=>{
    console.log("I am adding this todo",title,desc)
    let sno;
    if(todos.length===0)
    {
      sno=0;
    }
    else{
     sno=todos[todos.length-1].sno+1;
    }
   
    const mytodo={
       sno: sno,
       title: title,
       desc: desc,
    }
    setTodos([...todos,mytodo]);
    console.log(mytodo);

 
      
  }
  const [todos, setTodos] = useState(initTodo);
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
}, [todos])

  return (
    <>
    <Router>
      <Header title="My Todos List" />
        
      <Switch>
      <Route exact path="/" render={()=>{
        return(
        <>
        <AddTodo addTodo={addTodo}/>
        <Todos todos={todos} onDelete={onDelete} />
        </>
        )
      }}>
          </Route>
          <Route exact path="/about">
            <About />
          </Route>
          
        </Switch>


      <Footer />
      </Router>
    </>
  );
}

export default App;
