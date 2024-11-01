import './App.css';
import React from "react";
import { Route, useLocation } from "react-router-dom";
import Landing from './components/Landing/Landing.jsx'
import Home from './components/Home/Home'
import Gamedetail from './components/GameDetail/GameDetail';
import CreateGame from './components/CreateGame/CreateGame';
import CreateGenre from './components/CreateGenre/CreateGenre';
import SeeGenres from './components/SeeGenres/SeeGenres';
import EditGame from './components/EditGame/EditGame'
import NavBar from './components/NavBar/NavBar.jsx';

function App() {
  const location = useLocation()
  return (
    <React.Fragment>
      {location.pathname !== '/' && <NavBar/>}
      <Route exact path="/" component={Landing} />
      <Route exact path="/home" component={Home} />
      <Route exact path="/gamedetail/:id" component={Gamedetail} />
      <Route exact path="/gamedetail/:id/edit" component={EditGame} />
      <Route exact path="/creategame" component={CreateGame} />
      <Route exact path="/genres" component={SeeGenres} />
      <Route exact path="/creategenre" component={CreateGenre} />
    </React.Fragment>
  );
}

export default App;
