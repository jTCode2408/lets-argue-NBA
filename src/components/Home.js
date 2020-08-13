//main 'intro' page
//import player form here for basic functionality of searching 1 player
// link to versus page to compare players
import React, {useState} from 'react';
import {Route, Link, Switch} from 'react-router-dom';
import Navigation from './Nav';
import Ball from './Ball';
import {HomeCont, HomeHeader, Intro} from './styles';


const Home=()=>{

    return(
        <HomeCont>
          <div className="nav-home">
          <Navigation/>
          </div>

          <HomeHeader>
            <h1>Let's Argue!</h1>
          </HomeHeader>

          <Intro>
           <p>Tired of your friend saying LeBron is better than Michael Jordan?</p> 
           <p> Reminiscing about the GOAT Kobe's insane 05-06 season?</p>
           <p>   Want to prove the amount of free throws James Harden takes a game is outrageous? </p> 
           <p>   Whatever you want the stats to do, you can find it here!</p> 
          </Intro>

        <Link to="/player" aria-label="link to player page">    
        <Ball/>
        </Link>
     

        </HomeCont>
    )
}

export default Home;