import React from 'react';
import './App.css';
import Home from './components/Home';
import {Route, Switch} from 'react-router-dom';
import Player from './components/Player';
import Versus from './components/Versus';


function App() {
  return (
    <div className="App">
      <header className="App-header">
      Numbers (Never) Lie
      </header>

  
      <Switch>
      <Route exact path="/"><Home/></Route>
      <Route path="/player"><Player/> </Route>
                
        <Route path="/compare" ><Versus/></Route>
        </Switch>
    </div>
  );
}

export default App;
