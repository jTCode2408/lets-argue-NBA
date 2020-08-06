//main 'intro' page
//import player form here for basic functionality of searching 1 player
// link to versus page to compare players
import React, {useState} from 'react';
import Player from './Player';


const Home=()=>{
    return(
        <div className = "homeCont">
          <Player/>
        </div>
    )
}

export default Home;