import React from 'react'; 
import './App.css';
import Nav from './Nav';
import LandingPage from './LandingPage'; 
import Animals from './Components/Animals/Animals'
import AnimalDetail from './Components/Animals/Animal'; 
import AddAnimal from './Components/Animals/AddAnimal'; 
import UpdateAnimal from './Components/Animals/UpdateAnimal'
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
    <Route path="/create/animal"  component={AddAnimal} /> 
    <Route path="/update/animal/:id"  component={UpdateAnimal} /> 
  </Switch>
  
</Router>
    </div>
  );
}

export default App;
