//main 'intro' page
//import player form here for basic functionality of searching 1 player
// link to versus page to compare players
import React, {useState} from 'react';
import Player from './Player';
import Versus from './Versus';

const Home=()=>{
    return(
        <div className = "homeCont">
          <Versus/>
        </div>
    )
}

export default Home;