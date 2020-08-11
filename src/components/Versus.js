import React, {Component} from 'react';
import axios from "axios";
import Chart from './Chart';
import pattern from 'patternomaly';
import { Button, Form, FormGroup,Input } from 'reactstrap';
import Navigation from './Nav';
import {Link } from 'react-router-dom';

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
this.setState({value: ""})
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
                    pattern.draw('diamond-box', 'rgba(85,37,130, 0.7)'), //games
                    pattern.draw('ring', 'rgba(253,185,39, 0.7)'), //fg Attempt
                    pattern.draw('box', 'rgba(6,25,34, 0.7)'), // 3 atte
                    pattern.draw('triangle-inverted', 'rgba(99,113,122, 0.7)'), //ft att
                    pattern.draw('diamond-box', 'rgba(85,37,130, 0.7)'),//reb
                    pattern.draw('diamond-box', 'rgba(85,37,130, 0.7)'), //ast
                    pattern.draw('diamond-box', 'rgba(85,37,130, 0.7'), //stl
                    pattern.draw('diamond-box', 'rgba(85,37,130, 0.7)'), //blk
                    pattern.draw('diamond-box', 'rgba(85,37,130, 0.7)'), //trn
                    pattern.draw('ring', 'rgba(253,185,39, 0.7)'), //pts
                    pattern.draw('ring', 'rgba(253,185,39, 0.7)'), //fg%
                    pattern.draw('box', 'rgba(6,25,34, 0.7)'),//3 %
                    pattern.draw('triangle-inverted', 'rgba(99,113,122, 0.7)') //ft %
                ]
          }]
      }
   
        this.setState({ p2Stats: chartData})

    }).catch(err => {
      console.log(err)
    })
  }
  
  render(){
  return (
    <div className="versus-cont">
        <div className="nav-vs">
        <Navigation/>
        </div>
        
        <div className="inputs-cont">
     <Form inline onSubmit={this.handleSubmit} className = "players-inputs">
       <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
         
         <Input className="p1-input"
          type="text"
          value={this.state.value}
          onChange={this.handleChange}
          placeholder="player name"
         />
           </FormGroup>
           <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
          
        <Input className="p2-input"
          type="text" 
          value={this.state.value}
          onChange={this.handlep2Change}
          placeholder="player name"
         />
       </FormGroup>

       <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
         <Input  className="year-input"
          type="text"
          value={this.state.value}
          onChange={this.handleYear}
          placeholder="season"
         />
       </FormGroup>
       <Button color="primary">Let's Compare</Button>
     </Form>
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
         Enter player names to see season averages
         </div>
      
      )
}   

<Button color="secondary"><Link to="/player"> Single Player </Link></Button>
     </div>{/*results cont end*/}
   </div> /*players cont end*/
  );
}
}
export default Versus;