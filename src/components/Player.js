import React, {Component} from 'react';
import axios from "axios";
import {Link} from 'react-router-dom';
import Navigation from './Nav';
import Chart from './Chart';
import pattern from 'patternomaly';
import { Button, Form, FormGroup,Input } from 'reactstrap';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { noSeason, pre1980, yearFormat, noPlayer,injuredPlayer, dupePlayer, genError } from './Helpers';

class Player extends Component {
  constructor(props){
    super(props)
    this.state={
      player: null,
      year: null,
      playerStats: {},
      showChart: false,
    }
  }



handleSubmit = (e) => {
  e.preventDefault();
  this.getPlayerId();
  if(this.state.year === null){
    noSeason()

} else if(this.state.year.length < 4){
  yearFormat()
}
  else if(this.state.year < "1980"){
     pre1980()
  } else{
    this.setState({showChart:true})
}
}

handleChange = (e) => {
  const splitting = e.target.value.split(" ").join("_");
  if(splitting.length > 0){
    this.setState({player: splitting})
  } else {
    noPlayer()
  }
}
handleYear=(e)=>{
    const getYear = e.target.value
   this.setState({year : getYear})

}
  getPlayerId = () => {
    axios.get(`https://www.balldontlie.io/api/v1/players?search=${this.state.player}`)
    .then(async res => {
      if(res.data.data[0] === undefined){
        injuredPlayer()
      } else if(res.data.data.length > 1){
        dupePlayer()
      } else{
        await this.getPlayerStats(res.data.data[0].id)

      }
    }).catch(err => {
      console.log(err)
      genError();
    })
  }

  getPlayerStats = (id) => {
    const year =this.state.year
    axios.get(`https://www.balldontlie.io/api/v1/season_averages?season=${year}&player_ids[]=${id}`)
    .then(async res => {
        const displayData = Object.keys(res.data.data[0]).reduce((object, key) => {
            if (key !== "player_id" && key !== "season" && key !== "min" && key !== "oreb" && key !== "dreb" && key !== "pf" && key !=="fgm"  && key !=="fg3m" && key !=="ftm" ) {
              object[key] = res.data.data[0][key]
            }

            return object
          }, {})

        const chartData= 
            {labels:[  'GAMES','FG ATTEMPTS', '3PT ATTEMPTS', 'FT ATTEMPTS', 'REBOUNDS', 'ASSISTS','STEALS', 'BLOCKS', 'TURNOVERS', 'POINTS', 'FG %', '3PT %','FT %'],
                datasets:[{
                label: "Season Averages",
                data: Object.values(displayData),
                backgroundColor: [
                    pattern.draw('diamond', '#552583'), //games
                    pattern.draw('disc', '#FDB927'), //fg Attempt
                    pattern.draw('square', '#000000'), // 3 atte
                    pattern.draw('triangle', '#63727A'), //ft att
                    pattern.draw('diamond', '#552583'),//reb
                    pattern.draw('diamond', '#552583'), //ast
                    pattern.draw('diamond', '#552583'), //stl
                    pattern.draw('diamond', '#552583'), //blk
                    pattern.draw('diamond', '#552583'), //trn
                    pattern.draw('disc', '#FDB927'), //pts
                    pattern.draw('disc', '#FDB927'), //fg%
                    pattern.draw('square', '#000000'),//3 %
                    pattern.draw('triangle', '#63727A') //ft %
                ]
                }]
            }
        
      this.setState({ 
    playerStats: chartData})
})
    .catch(err => {
      console.log(err);
      genError();
    })
  }
  
  render(){
  return (
    <div className="player-cont">
        <div className="nav-player">
            <Navigation/>
        </div>
        <div className="player-head">
            Find an individual player's stats!
        </div>
        <div className="form-cont">
     <Form inline onSubmit={this.handleSubmit} className = "player1-form">
       <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
      
         <Input className="player-input"
          type="text"
          value={this.state.value}
          onChange={this.handleChange}
          placeholder="player name"
         />
       </FormGroup>
       <FormGroup  className="mb-2 mr-sm-2 mb-sm-0">
       
         <Input className="year-input"
          type="text"
          value={this.state.value}
          onChange={this.handleYear}
          placeholder="season"
         />
       </FormGroup>
       <Button color="primary" >Get Stats</Button>
     </Form>
     </div> 
    
     <div className = "results">
         {this.state.showChart === true ? (
             <div className="graph-cont">
             <Chart data={this.state.playerStats}/> 
             </div>
         )
         : (
            <div className = "pre-submit">
            Or, compare two players!
            </div>
         
         )
  }

  <Button color="secondary"><Link to="/compare">2 </Link></Button>
    

     </div> {/*results cont end*/}

    </div>//cont end
  );
}
}
export default Player;