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
  if(this.state.year === null){
    alert("please enter a season")

} else if(this.state.year.length < 4){
  alert(" please enter year 4 digit format")
}
  else if(this.state.year < "1980"){
      alert("please enter season after 1980")
  } else{
    this.setState({showChart:true})
}
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
       console.log("ORIGINAL CALL", res.data.data[0])
        const displayData = Object.keys(res.data.data[0]).reduce((object, key) => {
            if (key !== "player_id" && key !== "season" && key !== "min" && key !== "oreb" && key !== "dreb" && key !== "pf") {
              object[key] = res.data.data[0][key]
            }
            console.log("displayData", object)
            return object
          }, {})

        const chartData= 
            {labels:[  'GAMES','FG MAKES','FG ATTEMPTS', '3PT MAKES', '3PT ATTEMPTS', 'FT MAKES', 'FT ATTEMPTS', 'REBOUNDS', 'ASSISTS','STEALS', 'BLOCKS', 'TURNOVERS', 'POINTS', 'FG %', '3PT %','FT %'],
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
         PLAYER
         <input className="player-input"
          type="text"
          value={this.state.value}
          onChange={this.handleChange}
          placeholder="player name"
         />
       </label>
       <label>
         SEASON
         <input className="year-input"
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
             <div className="graph-cont">
          
             <Chart data={this.state.playerStats}/> 
             </div>
         )
         : (
            <div className = "pre-submit">
            "Enter player name to see season averages"
            </div>
         
         )
  }
    

     </div>


    </div>
  );
}
}
export default Player;