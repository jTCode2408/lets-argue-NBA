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
      year: null,
      showChart: false,
      p1First: null,
      p1Last:null,
      p2First:null,
      p2Last:null
    }
  }

handleSubmit = (e) => {
  e.preventDefault();
  this.getPOneId();
  this.getPTwoId();
 
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
      
      if(res.data.data[0] === undefined){
        alert("player is injured or did not play this season")
      } else if(res.data.data.length > 1){
        alert("Pleases specify player name")
      } else{
        await this.getPOneStats(res.data.data[0].id)
        this.setState({p1First: res.data.data[0].first_name})
        this.setState({p1Last: res.data.data[0].last_name})

      }
    }).catch(err => {
      console.log(err)
    })
  }


  getPTwoId = () => {
    axios.get(`https://www.balldontlie.io/api/v1/players?search=${this.state.player2}`)
    .then(async res => {

      if(res.data.data[0] === undefined){
        alert("This player is either injured or did not play this season")
      }
     else if(res.data.data.length > 1){
        alert("Pleases specify player name")
      } else{
        await this.getPTwoStats(res.data.data[0].id)
        this.setState({p2First:res.data.data[0].first_name})
        this.setState({p2Last:res.data.data[0].last_name})

      }
    }).catch(err => {
      console.log(err)
    })
  }

 
  getPOneStats = (id1) => {
    const year =this.state.year
    axios.get(`https://www.balldontlie.io/api/v1/season_averages?season=${year}&player_ids[]=${id1}`)
    .then(async res => {
        const displayData = Object.keys(res.data.data[0]).reduce((object, key) => {
            if (key !== "player_id" && key !== "season" && key !== "min" && key !== "oreb" && key !== "dreb" && key !== "pf") {
              object[key] = res.data.data[0][key]
            }
            console.log("displayData", object)
            return object
          }, {})

  
      const chartData= 
      {labels:[ 'ASSITS','BLOCKS','3PT %', '3PT ATTEMPTS', '3PT MAKES', 'FG %', 'FG ATTEMPTS', 'FG MAKES', 'FT %','FT ATTEMPS', 'FT MAKES', 'GAMES', 'POINTS', 'REBOUNDS', 'STEALS','TURNOVERS'],
          datasets:[{
          label: "Season Averages",
          data: Object.values(displayData)
  
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
        const displayData = Object.keys(res.data.data[0]).reduce((object, key) => {
            if (key !== "player_id" && key !== "season" && key !== "min" && key !== "oreb" && key !== "dreb" && key !== "pf") {
              object[key] = res.data.data[0][key]
            }
            console.log("displayData", object)
            return object
          }, {})

      const chartData= 
      {labels:[  'ASSITS','BLOCKS','3PT %', '3PT ATTEMPTS', '3PT MAKES', 'FG %', 'FG ATTEMPTS', 'FG MAKES', 'FT %','FT ATTEMPS', 'FT MAKES', 'GAMES', 'POINTS', 'REBOUNDS', 'STEALS','TURNOVERS'],
          datasets:[{
          label: "Season Averages",
          data: Object.values(displayData)
  
          }]
      }
   
        this.setState({ p2Stats: chartData})

    }).catch(err => {
      console.log(err)
    })
  }
  
  render(){
  return (
    <div className="players-cont">
        <Nav/>

        <div className="inputs-cont">
     <form onSubmit={this.handleSubmit} className = "players-inputs">
       <label>
         PLAYER 1
         <input className="p1-input"
          type="text"
          value={this.state.value}
          onChange={this.handleChange}
          placeholder="player1 name"
         />
           </label>
           <label>
               PLAYER 2
        <input 
          type="text" className="p2-input"
          value={this.state.value}
          onChange={this.handlep2Change}
          placeholder="player2 name"
         />
       </label>
       <label>
         SEASON
         <input  className="year-input"
          type="text"
          value={this.state.value}
          onChange={this.handleYear}
          placeholder="season"
         />
       </label>
       <input type="submit" value="Get Stats"/>
     </form>
     </div> {/*input cont end*/}

     <div className = "results-cont">

     {this.state.showChart === true ? (
         <div className="graphs-cont">

         <div className = "p1=graph-cont">
     <h2>{this.state.p1First} {this.state.p1Last}</h2>
          <Chart data={this.state.p1Stats}/> 
          </div>

          <div className="p2-graph-cont">
     <h2>{this.state.p2First} {this.state.p2Last}</h2>
          <Chart data={this.state.p2Stats}/> 
          </div>

          </div> //BOTH graphs div end
      )
      : (
         <div className = "pre-submit">
         "Enter player names to see season averages"
         </div>
      
      )
}
    
    
     </div>{/*results cont end*/}


    </div> /*players cont end*/
  );
}
}
export default Versus;