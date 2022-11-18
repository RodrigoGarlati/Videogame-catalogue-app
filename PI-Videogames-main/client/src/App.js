import './App.css';
import React from "react";
import { Route } from "react-router-dom";
import Landing from './components/Landing/Landing.jsx'
import Nav from './components/NavBar/NavBar'
import Home from './components/Home/Home'
import Gamedetail from './components/GameDetail/GameDetail';
import CreateGame from './components/CreateGame/CreateGame';
import CreateGenre from './components/CreateGenre/CreateGenre';
import SeeGenres from './components/SeeGenres/SeeGenres';

function App() {
  return (
    <React.Fragment>
      <Nav/>
      <Route exact path="/" component={Landing} />
      <Route path="/home" component={Home} />
      <Route path="/gamedetail/:id" component={Gamedetail} />
      <Route path="/creategame" component={CreateGame} />
      <Route path="/genres" component={SeeGenres} />
      <Route path="/creategenre" component={CreateGenre} />
    </React.Fragment>
  );
}

export default App;
