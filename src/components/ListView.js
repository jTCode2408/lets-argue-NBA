import React, { Component } from 'react';
import axios from 'axios';


class ListView extends Component{
    constructor(props){
    super(props)
    this.state={
     

    }
    }
    
    render(){
return(


    <div>
    'GAMES','FG ATTEMPTS', '3PT ATTEMPTS', 'FT ATTEMPTS', 'REBOUNDS', 'ASSISTS','STEALS', 'BLOCKS', 'TURNOVERS', 'POINTS', 'FG %', '3PT %','FT %'
  <ul>
{this.state.playerStats["ast"]}
<li> rebounds: {this.state.playerStats[0]}</li>
    <li>{this.state.playerStats["blk"]}</li>
    <li>{this.state.playerStats['fg3_pct']}</li>
    <li>{this.state.playerStats['fg3a']}</li>
    <li>{this.state.playerStats['fg_pct']}</li>
    <li>{this.state.playerStats['fga']}</li>
    <li>{this.state.playerStats['ft_pct']}</li>
    <li>{this.state.playerStats['fta']}</li>
    <li>{this.state.playerStats["games_played"]}</li>
    <li>{this.state.playerStats['pts']}</li>
    <li>{this.state.playerStats['reb']}</li>
    <li>{this.state.playerStats['stl']}</li>
    <li>{this.state.playerStats['turnover']}</li>
  </ul>
  </div>

)
    }
}

export default ListView;