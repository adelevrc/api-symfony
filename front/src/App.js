import React from 'react'; 
import Form from './Animals/AddAnimal2'; 
import './App.css';
import Nav from './Nav';
import LandingPage from './LandingPage'; 
import Animals from './Animals/Animals'
import AnimalDetail from './Animals/Animal'; 
// import AddAnimal from './Animals/AddAnimal'
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
   
<Router> 
  <Nav />

  <Switch>
    <Route path="/" exact component={LandingPage} /> 
    <Route path="/animals"  exact component={Animals} /> 
    <Route path="/animals/:id"  component={AnimalDetail} /> 
    {/* <Route path="/create/animals"  component={AddAnimal} />  */}
    <Route path="/create/animals"  component={Form} /> 
  </Switch>
  
</Router>
    </div>
  );
}

export default App;
