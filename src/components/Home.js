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
          <Nav/>
     HOME PAGE
     "Game info here"
     "Button to continue"
        </div>
    )
}

export default Home;