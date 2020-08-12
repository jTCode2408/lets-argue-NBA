import React from 'react';
import './App.css';
import Home from './components/Home';
import {Route, Switch} from 'react-router-dom';
import Player from './components/Player';
import Versus from './components/Versus';
import MatrixCard from 'matrix-card';


function App() {
 
  return (
    <div className="App">
      <header className="App-header">
      <div style={{
		
			display: "flex",
			flexDirection: "column",
			alignItems: "center",
		}}>
			<div>
<MatrixCard 
  id={"matrix-id"}
  matrixText={"ITS ARGUING TIME"}
  delay={40}
  backgroundColor={"rgba(42,40,45,0.3)"}
  textFontSize={"14"}
  textMainColor={"#000000"}
  textAlternateColorList={["#808080", "#989889", "#A9A9A9", "#C0C0C0"]}
  textAlternateColorRatio={0.1}
  canvasSize={{width:window.innerWidth, height:330}}
  styleOverrideForChildrenDiv={{backgroundColor: 'none'}}

>


 <div className="head-text">
      Numbers (Never) Lie
      </div>

</MatrixCard>
</div>
</div>
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
