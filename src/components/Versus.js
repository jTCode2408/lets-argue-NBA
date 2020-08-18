import React, {Component} from 'react';
import axios from "axios";
import Chart from './Chart';
import pattern from 'patternomaly';
import { Button, Form, FormGroup,Input } from 'reactstrap';
import Navigation from './Nav';
import {Link } from 'react-router-dom';
import { noSeason, pre1980, yearFormat, noPlayer,injuredPlayer, dupePlayer, genError } from './Helpers';
import{ VsCont, VsHead, VsInputsDiv, BothGraphsCont, P1GraphCont, P2GraphCont, P1Toggled, P2Toggled, ToggledCont, PreSubmit, VSResults, VsListCont, P1List, P2List, ListHead, ListButtonDiv} from './styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBasketballBall} from '@fortawesome/free-solid-svg-icons';

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
      p2Last:null,
      sideBySide: false,
      showList:false,
      p1List:{},
      p2list:{}
    }
  }

handleSubmit = (e) => {
  e.preventDefault();
  this.getPOneId();
  this.getPTwoId();
 
  if(this.state.year === null){
      noSeason();

  } else if(this.state.year.length < 4){
    yearFormat();
  }
    else if(this.state.year < "1980"){
        pre1980();
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
    noPlayer();
  }
}

    handlep2Change = (e)=>{
 const split2 = e.target.value.split(" ").join("_");
  if(split2.length > 0){
    this.setState({player2: split2})
   } else {
     noPlayer();
    }
 }

 handleYear=(e)=>{
    const getYear = e.target.value
    this.setState({year : getYear})
    
}

onToggle=(e)=>{
    this.setState({sideBySide: true});
    this.setState({showChart:false});
    this.setState({showList:false})
}

toggleList=(e)=>{
    this.setState({showChart:false});
    this.setState({sideBySide: false});
    this.setState({showList:true})
}

  getPOneId = () => {
    axios.get(`https://www.balldontlie.io/api/v1/players?search=${this.state.player1}`)
    .then(async res => {
      
      if(res.data.data[0] === undefined){
        injuredPlayer();
      } else if(res.data.data.length > 1){
        dupePlayer();
      } else{
        await this.getPOneStats(res.data.data[0].id)
        this.setState({p1First: res.data.data[0].first_name})
        this.setState({p1Last: res.data.data[0].last_name})

      }
    }).catch(err => {
      console.log(err);
      genError();
    })
  }


  getPTwoId = () => {
    axios.get(`https://www.balldontlie.io/api/v1/players?search=${this.state.player2}`)
    .then(async res => {

      if(res.data.data[0] === undefined){
        injuredPlayer();
      }
     else if(res.data.data.length > 1){
        dupePlayer();
      } else{
        await this.getPTwoStats(res.data.data[0].id)
        this.setState({p2First:res.data.data[0].first_name})
        this.setState({p2Last:res.data.data[0].last_name})

      }
    }).catch(err => {
      console.log(err)
      genError();
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
          this.setState({p1List: Object.values(displayData)})
      const chartData= 
      {labels:[  'GAMES','FG ATTEMPTS', '3PT ATTEMPTS', 'FT ATTEMPTS', 'REBOUNDS', 'ASSISTS','STEALS', 'BLOCKS', 'TURNOVERS', 'POINTS', 'FG %', '3PT %','FT %'],
          datasets:[{
          label: "Season Averages",
          color:'#55283',
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
     //   console.log('CHART DATA', res.data.data[0])
     
        const displayData = Object.keys(res.data.data[0]).reduce((object, key) => {
            if (key !== "player_id" && key !== "season" && key !== "min" && key !== "oreb" && key !== "dreb" && key !== "pf" && key !=="fgm"  && key !=="fg3m" && key !=="ftm" ) {
              object[key] = res.data.data[0][key]
              
            }
           
            return object
          }, {})
          this.setState({p2List: Object.values(displayData)})
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
      genError();
    })
  }
  
  render(){
  return (
      <>
    <div className="nav-vs">
    <Navigation/>
    </div>
    <VsCont>
      
        <VsHead>
            Compare players' stats!
        </VsHead>
        <VsInputsDiv>
     <Form inline onSubmit={this.handleSubmit} className = "players-inputs">
       <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
         
         <Input className="p1-input" bsSize="lg"
          type="text"
          value={this.state.value}
          onChange={this.handleChange}
          placeholder="player name"
         />
           </FormGroup>
           <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
          
        <Input className="p2-input" bsSize="lg"
          type="text" 
          value={this.state.value}
          onChange={this.handlep2Change}
          placeholder="player name"
         />
       </FormGroup>

       <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
         <Input  className="year-input" bsSize="lg"
          type="text"
          value={this.state.value}
          onChange={this.handleYear}
          placeholder="season"
         />
       </FormGroup>
       <Button color="primary" size="lg">Let's Compare</Button>
     </Form>
     </VsInputsDiv> {/*input cont end*/}

     <VSResults>

     {this.state.showChart === true ? (
         <>
         <BothGraphsCont>

         <P1GraphCont>
     <h2>{this.state.p1First} {this.state.p1Last}</h2>
          <Chart data={this.state.p1Stats}/> 
          </P1GraphCont>

          <P2GraphCont>
     <h2>{this.state.p2First} {this.state.p2Last}</h2>
          <Chart data={this.state.p2Stats}/> 
          </P2GraphCont>

          </BothGraphsCont> 
          <div className="toggle-btn">
          <Button outline color="primary" size="lg" onClick={this.onToggle}>SideBySide</Button>
          </div>
            <ListButtonDiv>
          <Button outline color="primary" size="lg"onClick={this.toggleList}>List View</Button>
          </ListButtonDiv>
</>
      )
      : 
      
      (
<>
        {this.state.sideBySide && 
            <div className = "toggled-results-cont">
            
                 <ToggledCont>
                <P1Toggled>
            <h2>{this.state.p1First} {this.state.p1Last}</h2>
                 <Chart data={this.state.p1Stats}/> 
               
                 </P1Toggled>
            
                 <P2Toggled
                 >
            <h2>{this.state.p2First} {this.state.p2Last}</h2>
                 <Chart data={this.state.p2Stats}/> 
                 </P2Toggled>
                     </ToggledCont>

           <ListButtonDiv>
                 <Button outline color="primary" size="lg" onClick={this.toggleList}>List View</Button>
                 </ListButtonDiv>
                     </div>
  }
            
            {this.state.showList &&
            <>
            <VsListCont>
                <P1List>
                    <ListHead>
                <h2>{this.state.p1First} {this.state.p1Last}</h2>
            <h3>{this.state.year}</h3>
            </ListHead>
            <ul class="fa-ul">

           <li> <FontAwesomeIcon icon={faBasketballBall}></FontAwesomeIcon> GAMES PLAYED: {this.state.p1List[0]}</li>
           <li> <FontAwesomeIcon icon={faBasketballBall}></FontAwesomeIcon> FG ATTEMPTS: {this.state.p1List[1]} </li>
           <li> <FontAwesomeIcon icon={faBasketballBall}></FontAwesomeIcon> 3PT ATTEMPTS: {this.state.p1List[2]}</li>
           <li> <FontAwesomeIcon icon={faBasketballBall}></FontAwesomeIcon> FT ATTEMPTS: {this.state.p1List[3]}</li>
           <li> <FontAwesomeIcon icon={faBasketballBall}></FontAwesomeIcon> REBOUNDS: {this.state.p1List[4]}</li>
           <li> <FontAwesomeIcon icon={faBasketballBall}></FontAwesomeIcon> ASSISTS: {this.state.p1List[5]}</li>
           <li> <FontAwesomeIcon icon={faBasketballBall}></FontAwesomeIcon> STEALS: {this.state.p1List[6]}</li>
           <li> <FontAwesomeIcon icon={faBasketballBall}></FontAwesomeIcon> BLOCKS: {this.state.p1List[7]}</li>
           <li> <FontAwesomeIcon icon={faBasketballBall}></FontAwesomeIcon> TURNOVERS: {this.state.p1List[8]}</li>
           <li> <FontAwesomeIcon icon={faBasketballBall}></FontAwesomeIcon> POINTS: {this.state.p1List[9]}</li>
           <li> <FontAwesomeIcon icon={faBasketballBall}></FontAwesomeIcon> FIELD GOAL % : {this.state.p1List[10]}</li>
           <li> <FontAwesomeIcon icon={faBasketballBall}></FontAwesomeIcon> 3 PT % : {this.state.p1List[11]}</li>
           <li> <FontAwesomeIcon icon={faBasketballBall}></FontAwesomeIcon> FT % : {this.state.p1List[12]}</li>
                  </ul>
                </P1List>

                <P2List>
                    <ListHead>
                <h2>{this.state.p2First} {this.state.p2Last}</h2>
                <h3>{this.state.year}</h3>
                </ListHead>

            <ul class="fa-ul">
            <li> <FontAwesomeIcon icon={faBasketballBall}></FontAwesomeIcon> GAMES PLAYED: {this.state.p2List[0]}</li>
            <li> <FontAwesomeIcon icon={faBasketballBall}></FontAwesomeIcon> FG ATTEMPTS: {this.state.p2List[1]}</li>
            <li> <FontAwesomeIcon icon={faBasketballBall}></FontAwesomeIcon> 3PT ATTEMPTS: {this.state.p2List[2]}</li>
            <li> <FontAwesomeIcon icon={faBasketballBall}></FontAwesomeIcon> FT ATTEMPTS: {this.state.p2List[3]}</li>
            <li> <FontAwesomeIcon icon={faBasketballBall}></FontAwesomeIcon> REBOUNDS: {this.state.p2List[4]}</li>
            <li> <FontAwesomeIcon icon={faBasketballBall}></FontAwesomeIcon> ASSISTS: {this.state.p2List[5]}</li>
            <li> <FontAwesomeIcon icon={faBasketballBall}></FontAwesomeIcon> STEALS: {this.state.p2List[6]}</li>
            <li> <FontAwesomeIcon icon={faBasketballBall}></FontAwesomeIcon> BLOCKS: {this.state.p2List[7]}</li>
            <li> <FontAwesomeIcon icon={faBasketballBall}></FontAwesomeIcon> TURNOVERS: {this.state.p2List[8]}</li>
            <li> <FontAwesomeIcon icon={faBasketballBall}></FontAwesomeIcon> POINTS: {this.state.p2List[9]}</li>
            <li> <FontAwesomeIcon icon={faBasketballBall}></FontAwesomeIcon> FIELD GOAL % : {this.state.p2List[10]}</li>
            <li> <FontAwesomeIcon icon={faBasketballBall}></FontAwesomeIcon> 3 PT % : {this.state.p2List[11]}</li>
            <li> <FontAwesomeIcon icon={faBasketballBall}></FontAwesomeIcon> FT % : {this.state.p2List[12]}</li>

                </ul>
                </P2List>
            </VsListCont>
                <div className="toggle-btn">
            <Button outline color="primary" size="lg" onClick={this.onToggle}>SideBySide </Button>
            </div>
             </>
            }
            
         <PreSubmit>
         Get a single player
         </PreSubmit>
         </>      
      )
}   

<div className = "link-to">
<Button outline color="info" size="lg"><Link to="/player"> One Player </Link></Button>
</div>
     </VSResults>{/*results cont end*/}
   </VsCont> {/*players cont end*/}

   </>
  );
}
}
export default Versus;