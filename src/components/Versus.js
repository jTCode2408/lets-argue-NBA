//for searching 2 players...results returned
// api/v1/season_averages?season=2018&player_ids[]=1&player_ids[]=2 will return regular season averages for player_ids 1 and 2.
//ALL SEASON DROPDOWN
//will have 2 do 2 playerId calls, then add id, other id to getplayer stats

import React, {Component} from 'react';
import axios from "axios";
import Nav from './Nav';
import Chart from './Chart';

class Versus extends Component {
  constructor(props){
    super(props)
    this.state={
      player1: null,
      player2: null,
      p1Stats: {},
      p2Stats:{},
      year: null
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

    handlep2Change = (e)=>{
 const split2 = e.target.value.split(" ").join("_");
  if(split2.length > 0){
    this.setState({player2: split2})
   } else {
     alert("Please type players name!")
    }
 }

 handleYear=(e)=>{
    const getYear = e.target.value
   this.setState({year : getYear})


}
  getPOneId = () => {
    axios.get(`https://www.balldontlie.io/api/v1/players?search=${this.state.player1}`)
    .then(async res => {
      console.log("P1 ID", res.data.data)
      if(res.data.data[0] === undefined){
        alert("This player is either injured or did not play this season")
      } else if(res.data.data.length > 1){
        alert("Pleases specify player name")
      } else{
        await this.getPOneStats(res.data.data[0].id)

      }
    }).catch(err => {
      console.log(err)
    })
  }


  getPTwoId = () => {
    axios.get(`https://www.balldontlie.io/api/v1/players?search=${this.state.player2}`)
    .then(async res => {
      console.log("P2 ID",res.data.data)
      if(res.data.data[0] === undefined){
        alert("This player is either injured or did not play this season")
      }
     else if(res.data.data.length > 1){
        alert("Pleases specify player name")
      } else{
        await this.getPTwoStats(res.data.data[0].id)

      }
    }).catch(err => {
      console.log(err)
    })
  }

 
  getPOneStats = (id1) => {
    const year =this.state.year
    axios.get(`https://www.balldontlie.io/api/v1/season_averages?season=${year}&player_ids[]=${id1}`)
    .then(async res => {
  
      const chartData= 
      {labels:Object.keys(res.data.data[0]),
          datasets:[{
          label: "Season Averages",
          data: Object.values(res.data.data[0])
  
          }]
      }
   
        this.setState({ p1Stats: chartData})

    }).catch(err => {
      console.log(err)
    })
  }

  getPTwoStats = (id2) => {
    const year =this.state.year
    axios.get(`https://www.balldontlie.io/api/v1/season_averages?season=${year}&player_ids[]=${id2}`)
    .then(async res => {

      const chartData= 
      {labels:Object.keys(res.data.data[0]),
          datasets:[{
          label: "Season Averages",
          data: Object.values(res.data.data[0])
  
          }]
      }
   
        this.setState({ p2Stats: chartData})

    }).catch(err => {
      console.log(err)
    })
  }
  
  render(){
  return (
    <div className="player-cont">
        <Nav/>
        <div className="forms-cont">
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
               p2Name
        <input 
          type="text"
          value={this.state.value}
          onChange={this.handlep2Change}
          placeholder="player2 name"
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
       <input type="submit" value="Get Stats"/>
     </form>
     </div>
     <div className = "results">
         <div className="p1-graph"> 
         <h2>Player 1</h2>
     <Chart data={this.state.p1Stats}/> 
     </div>
     <div className = "p2-graph">
     <h2>Player 2</h2>
     <Chart data={this.state.p2Stats}/> 
     </div>
    
     </div>


    </div>
  );
}
}
export default Versus;