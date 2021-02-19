import React from 'react'; 
import './App.css';
import Animals from './Animals/Animals'
import AnimalDetail from './Animals/Animal'; 
import AddAnimal from './Animals/AddAnimal'
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
   
<Router> 
<div className="App">

  <Switch>
    {/* <Route path="/" exact component={Home} />  */}
    <Route path="/animals"  exact component={Animals} /> 
    <Route path="/animals/:id"  component={AnimalDetail} /> 
    <Route path="/create/animals"  component={AddAnimal} /> 
  </Switch>
   
</div>
</Router>
    </div>
  );
}

export default App;
