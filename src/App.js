import React from 'react';
import './App.css';
import Home from './components/Home';
import {Route, Switch} from 'react-router-dom';
import Player from './components/Player';
import Versus from './components/Versus';
import Header from './Header';
import { toast } from 'react-toastify';

toast.configure();


function App() {
  
 
  return (
    <div className="App">
        
      <header className="App-header">
<Header/>

      </header>
      <Switch>
      <Route exact path="/"><Home/></Route>
      </Switch>
      <Route exact path="/player"><Player/> </Route>
                
        <Route exact path="/compare" ><Versus/></Route>
 
    
    </div>
  );
}

export default App;
