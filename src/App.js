import React from 'react';
import './App.css';
import Home from './components/Home';
import {Route, Switch} from 'react-router-dom';
import Player from './components/Player';
import Versus from './components/Versus';
import Header from './components/Header';
import { toast } from 'react-toastify';
import {AppHeader} from './components/styles';

toast.configure();

function App() {
  
  return (
    <div className="App">
        
      <AppHeader>
<Header/>

      </AppHeader>
      <Switch>
      <Route exact path="/"><Home/></Route>
      </Switch>
      <Route exact path="/player"><Player/> </Route>
                
        <Route exact path="/compare" ><Versus/></Route>
 
    
    </div>
  );
}

export default App;
