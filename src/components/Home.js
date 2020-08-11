//main 'intro' page
//import player form here for basic functionality of searching 1 player
// link to versus page to compare players
import React, {useState} from 'react';
import Player from './Player';
import {Route, Link, Switch} from 'react-router-dom';
import Versus from './Versus';
import Nav from './Nav';

const Home=()=>{

    return(
        <div className = "homeCont">
          <div className="nav-cont">
          <Nav/>
          </div>

          <div className="header">
            <h1>Let's Argue!</h1>
          </div>

          <div className="intro">
           <p>Tired of your friend saying LeBron is better than Michael Jordan?</p> 
           <p>  Do you trust numbers more than your eyes?</p> 
           <p>   Want to prove the amount of free throws James Harden takes a game is outrageous? </p> 
           <p>   Whatever you want the stats to do, you can find them here!</p> 

          </div>
     <button><Link to="/player">Continue</Link></button>

        </div>
    )
}

export default Home;