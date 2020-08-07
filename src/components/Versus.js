//for searching 2 players...results returned
// api/v1/season_averages?season=2018&player_ids[]=1&player_ids[]=2 will return regular season averages for player_ids 1 and 2.
//ALL SEASON DROPDOWN
//will have 2 do 2 playerId calls, then add id, other id to getplayer stats

import React, {Component} from 'react';
import axios from "axios";

class Versus extends Component {
  constructor(props){
    super(props)
    this.state={
      player1: null,
      player2: null,
      p1Stats: {},
      p2Stats:{}
    }
  }

handleSubmit = (e) => {
  e.preventDefault();
  this.getPOneId();
  this.getPTwoId();
  console.log('SUBMITTING1', this.state.player1)
  console.log('SUBMITTING2', this.state.player2)
}

handleChange = (e) => {
  const splitting = e.target.value.split(" ").join("_");
  if(splitting.length > 0){
    this.setState({player1: splitting})
  } else {
    alert("Please type players name!")
  }
}
//IN CASE NEEDED

    handlep2Change = (e)=>{
 const split2 = e.target.value.split(" ").join("_");
  if(split2.length > 0){
    this.setState({player2: split2})
   } else {
     alert("Please type players name!")
    }
 }

  getPOneId = () => {
    axios.get(`https://www.balldontlie.io/api/v1/players?search=${this.state.player1}`)
    .then(async res => {
      console.log("P1 CALL", res.data.data)
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


  getPTwoId = () => {
    axios.get(`https://www.balldontlie.io/api/v1/players?search=${this.state.player2}`)
    .then(async res => {
      console.log("P2",res.data.data)
      if(res.data.data[1] === undefined){
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

  getPlayerStats = (id1) => {
    axios.get(`https://www.balldontlie.io/api/v1/season_averages?season=2018&player_ids[]=${id1}&player_ids[]=${id1}`)
    .then(async res => {
      console.log("STATS", res.data)
      this.setState({ p1Stats: res.data.data[0]})
      this.setState({ p2Stats: res.data.data[0]})
    }).catch(err => {
      console.log(err)
    })
  }
  
  render(){
  return (
    <div className="player-cont">
     <form onSubmit={this.handleSubmit} className = "players-form">
       <label>
         p1Name
         <input 
          type="text"
          value={this.state.value}
          onChange={this.handleChange}
          placeholder="player1 name"
         />
           </label>
           <label>
        <input 
          type="text"
          value={this.state.value}
          onChange={this.handlep2Change}
          placeholder="player2 name"
         />
       </label>
       <input type="submit" value="Get Stats"/>
     </form>
     
     <div className = "results">

    <h2>Season Averages:</h2>
    

     </div>


    </div>
  );
}
}
export default Versus;