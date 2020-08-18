import React, {Component} from 'react';
import axios from "axios";
import {Link} from 'react-router-dom';
import Navigation from './Nav';
import Chart from './Chart';
import pattern from 'patternomaly';
import { Button, Form, FormGroup,Input } from 'reactstrap';
import 'react-toastify/dist/ReactToastify.css';
import { noSeason, pre1980, yearFormat, noPlayer,injuredPlayer, dupePlayer, genError} from './Helpers';
import {SinglePlayerGraph, PlayerCont, PlayerHead, PreSubmit, PlayerResults, PlayerInput, SingleList, ListHead} from './styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBasketballBall} from '@fortawesome/free-solid-svg-icons';

class Player extends Component {
  constructor(props){
    super(props)
    this.state={
      player: null,
      year: null,
      playerStats: {},
      showChart: false,
      First: null,
      Last:null,
      showList:false,
      listData:{}
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
this.setState({value: ""})
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

toggleList=(e)=>{
  this.setState({showList:true})
  this.setState({showChart:false})
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
        this.setState({First: res.data.data[0].first_name})
        this.setState({Last: res.data.data[0].last_name})

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
      console.log('DATA', res.data.data[0])
        const displayData = Object.keys(res.data.data[0]).reduce((object, key) => {
            if (key !== "player_id" && key !== "season" && key !== "min" && key !== "oreb" && key !== "dreb" && key !== "pf" && key !=="fgm"  && key !=="fg3m" && key !=="ftm" ) {
              object[key] = res.data.data[0][key]
            }

            return object
          }, {})

          this.setState({listData: Object.values(displayData)})
          

        const chartData= 
            {labels:[  'GAMES','FG ATTEMPTS', '3PT ATTEMPTS', 'FT ATTEMPTS', 'REBOUNDS', 'ASSISTS','STEALS', 'BLOCKS', 'TURNOVERS', 'POINTS', 'FG %', '3PT %','FT %'],
           
                datasets:[{
                label: "Season Averages",
                data: Object.values(displayData),
                fontColor: 'rgba(85,37,130)',
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
    console.log(this.state.playerStats)
})
    .catch(err => {
      console.log(err);
      genError();
    })
  }
  
  render(){
  return (
      <>
    <div className="nav-player">
    <Navigation/>
</div>
    <PlayerCont>
        
        <PlayerHead>
            Find an individual player's stats!
        </PlayerHead>

        <PlayerInput>
     <Form inline onSubmit={this.handleSubmit} className = "player-input">
       <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
      
         <Input className="player-input" bsSize="lg"
          type="text"
          value={this.state.value}
          onChange={this.handleChange}
          placeholder="player name"
         />
       </FormGroup>
       <FormGroup  className="mb-2 mr-sm-2 mb-sm-0">
       
         <Input className="year-input" bsSize="lg"
          type="text"
          value={this.state.value}
          onChange={this.handleYear}
          placeholder="season"
         />
       </FormGroup>
       <Button color="primary" size="lg" >Get Stats</Button>
     </Form>
     </PlayerInput> 
    
     <PlayerResults>

         {this.state.showChart === true ? (
            <>
             <SinglePlayerGraph>
            <h2>{this.state.First} {this.state.Last}</h2>
         <h3>{this.state.year} </h3>
             <Chart data={this.state.playerStats}/> 
             </SinglePlayerGraph>

   
          <Button outline color="primary" size="lg" onClick={this.toggleList}>List View</Button>
          </>

         )

         : 
            (

              <>
              { this.state.showList && 
              <>
                <SingleList>
                  <div>
                <ListHead>{this.state.First} {this.state.Last}
                
                <h3>{this.state.year} </h3>
                </ListHead>
                </div>
                <ul class="fa-ul">
              <li> <FontAwesomeIcon icon={faBasketballBall}></FontAwesomeIcon> GAMES PLAYED: {this.state.listData[0]}</li>
              <li> <FontAwesomeIcon icon={faBasketballBall}></FontAwesomeIcon> FG ATTEMPTS: {this.state.listData[1]}</li>
              <li> <FontAwesomeIcon icon={faBasketballBall}></FontAwesomeIcon> 3PT ATTEMPTS: {this.state.listData[2]}</li>
              <li> <FontAwesomeIcon icon={faBasketballBall}></FontAwesomeIcon> FT ATTEMPTS: {this.state.listData[3]}</li>
              <li> <FontAwesomeIcon icon={faBasketballBall}></FontAwesomeIcon> REBOUNDS: {this.state.listData[4]}</li>
              <li> <FontAwesomeIcon icon={faBasketballBall}></FontAwesomeIcon> ASSISTS: {this.state.listData[5]}</li>
              <li> <FontAwesomeIcon icon={faBasketballBall}></FontAwesomeIcon> STEALS: {this.state.listData[6]}</li>
              <li> <FontAwesomeIcon icon={faBasketballBall}></FontAwesomeIcon> BLOCKS: {this.state.listData[7]}</li>
              <li> <FontAwesomeIcon icon={faBasketballBall}></FontAwesomeIcon> TURNOVERS: {this.state.listData[8]}</li>
              <li> <FontAwesomeIcon icon={faBasketballBall}></FontAwesomeIcon> POINTS: {this.state.listData[9]}</li>
              <li> <FontAwesomeIcon icon={faBasketballBall}></FontAwesomeIcon> FIELD GOAL % : {this.state.listData[10]}</li>
              <li> <FontAwesomeIcon icon={faBasketballBall}></FontAwesomeIcon> 3 PT % : {this.state.listData[11]}</li>
              <li> <FontAwesomeIcon icon={faBasketballBall}></FontAwesomeIcon> FT % : {this.state.listData[12]}</li>

              </ul>
              </SingleList>
              
              </>
              }
            
            <PreSubmit>
            Or, compare two players!
            </PreSubmit>
</>
         )

         
  }


  <Button outline color="info" size="lg"><Link to="/compare"> Two Players </Link></Button>
  {/**TODO: Show option to toggle display stats numbers as list*/}
  
     </PlayerResults> {/*results cont end*/}

    </PlayerCont>

    </>
  );
}
}
export default Player;