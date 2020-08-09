import React, {Component} from 'react';
import axios from "axios";
import {Route, Link, Switch} from 'react-router-dom';
import Versus from './Versus';
import Nav from './Nav';

import Chart from './Chart';


class Player extends Component {
  constructor(props){
    super(props)
    this.state={
      player: null,
      year: null,
      playerStats: {},
      showChart: false

    }
  }

handleSubmit = (e) => {
  e.preventDefault();
  this.getPlayerId();
  this.setState({showChart:true})
  console.log('SUBMITTING', this.state.player)
}

handleChange = (e) => {
  const splitting = e.target.value.split(" ").join("_");
  if(splitting.length > 0){
    this.setState({player: splitting})
  } else {
    alert("Please type players name!")
  }
}
handleYear=(e)=>{
    const getYear = e.target.value
   this.setState({year : getYear})

}
  getPlayerId = () => {
    axios.get(`https://www.balldontlie.io/api/v1/players?search=${this.state.player}`)
    .then(async res => {
      // console.log(res.data.data)
      if(res.data.data[0] === undefined){
        alert("This player is either injured or did not play this season")
      } else if(res.data.data.length > 1){
        alert("Pleases specify player name")
      } else{
        await this.getPlayerStats(res.data.data[0].id)

      }
    }).catch(err => {
      console.log(err)
    })
  }

  getPlayerStats = (id) => {
      
    const year =this.state.year
    axios.get(`https://www.balldontlie.io/api/v1/season_averages?season=${year}&player_ids[]=${id}`)
    .then(async res => {
       
        const displayData = Object.keys(res.data.data[0]).reduce((object, key) => {
            if (key !== "player_id" && key !== "season" && key !== "min" && key !== "oreb" && key !== "dreb" && key !== "pf") {
              object[key] = res.data.data[0][key]
            }
            console.log("displayData", object)
            return object
          }, {})

        const chartData= 
            {labels:[ 'ast','blk','fg3_pct', 'fg3a', 'fg3m', 'fg_pct', 'fga', 'fgm', 'ft_pct','fta', 'ftm', 'games_played', 'POINTS', 'rebounds', 'steal','turnover'],
                datasets:[{
                label: "Season Average",
                data: Object.values(displayData)
        
                }]
            }
        
      this.setState({ 
    playerStats: chartData})

})
  
    .catch(err => {
      console.log(err)
    })
  }
  
  render(){
  return (
    <div className="player-cont">
        <Nav/>
        <div className="form-cont">
     <form onSubmit={this.handleSubmit} className = "player1-form">
       <label>
         Name
         <input 
          type="text"
          value={this.state.value}
          onChange={this.handleChange}
          placeholder="player name"
         />
       </label>
       <label>
         Year
         <input 
          type="text"
          value={this.state.value}
          onChange={this.handleYear}
          placeholder="season"
         />
       </label>
       <input type="submit"  value="Get Stats"/>
     </form>
     </div>
     <div className = "results">
         {this.state.showChart === true ? (
          
             <Chart data={this.state.playerStats}/> 
         )
         : (
            <div className = "loading">
            "Enter player name to see season averages"
            </div>
         
         )
  }
    
   {/*
   <h2>Season Averages:</h2>
     <ul>
        <li>games played: {this.state.playerStats["games_played"]}</li>
        <li>minutes:{this.state.playerStats["min"]}</li>
        <li> points: {this.state.playerStats["pts"]}</li>
        <li> rebounds: {this.state.playerStats["reb"]}</li>
        <li> assists: {this.state.playerStats["ast"]}</li>
  <li>steals:{this.state.playerStats["stl"]}</li>
        <li>turnovers: {this.state.playerStats["turnover"]}</li>
        <li>Field goal: {this.state.playerStats["fg_pct"]}</li>
        <li>FG A "fga"</li>
        <li>FG M "fgm"</li>
        <li>3pt %:{this.state.playerStats["fg3_pct"]} </li>
        <li>3PT A "fg3a"</li>
        <li>3PT M "fg3m"</li>
        <li>Free throw %: {this.state.playerStats["ft_pct"]}</li>
        <li>FT A "fta"</li>
        <li>FT M "ftm"</li>

     </ul>
   */}
     </div>


    </div>
  );
}
}
export default Player;