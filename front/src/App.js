import React from 'react'; 
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import LoginButton from './Components/Auth0/LoginButton'; 
import LogoutButton from './Components/Auth0/LogoutButton'; 
import Profile from './Components/Auth0/Profile'; 
import Nav from './Nav';
import LandingPage from './LandingPage'; 
import Animals from './Components/Animals/Animals';
import AnimalDetail from './Components/Animals/Animal'; 
import AddAnimal from './Components/Animals/AddAnimal'; 
import UpdateAnimal from './Components/Animals/UpdateAnimal'; 
import Articles from './Components/Articles/Articles'; 
import Article from './Components/Articles/Article'; 



function App() {
  
  return (
    <div className="App">
      <LoginButton />
      <LogoutButton />
<Router> 
  <Nav />

  <Switch>
    <Route path="/" exact component={LandingPage} /> 
    <Route path='/profile' exact component={Profile} />
    <Route path="/animals"  exact component={Animals} /> 
    <Route path="/animals/:id"  component={AnimalDetail} /> 
    <Route path="/create/animal"  component={AddAnimal} /> 
    <Route path="/update/animal/:id"  component={UpdateAnimal} /> 
    <Route path="/articles"  exact component={Articles} />
    <Route path="/articles/:id"  component={Article} /> 
  </Switch>
  
</Router>
    </div>
  );
}

export default App;
