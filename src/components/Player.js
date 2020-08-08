import React, {Component} from 'react';
import axios from "axios";
import {Route, Link, Switch} from 'react-router-dom';
import Versus from './Versus';
import Nav from './Nav';

class Player extends Component {
  constructor(props){
    super(props)
    this.state={
      player: null,
      playerStats: {}
    }
  }

handleSubmit = (e) => {
  e.preventDefault();
  this.getPlayerId()
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
    axios.get(`https://www.balldontlie.io/api/v1/season_averages?season=2006&player_ids[]=${id}`)
    .then(async res => {
      console.log(res.data.data)
      this.setState({ playerStats: res.data.data[0]})
    }).catch(err => {
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
       <input type="submit" value="Get Stats"/>
     </form>
     </div>
     <div className = "results">

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
     </div>


    </div>
  );
}
}
export default Player;