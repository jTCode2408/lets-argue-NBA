//if seraching single player
//add to Home page, will be main basic app functionality
// api/v1/season_averages?season=2018&player_ids[]=1&player_ids[]=2 will return regular season averages for player_ids 1 and 2. ONLY NEED 1 PLAYER HERE
//ALLOW SEASON DROPDOWN
//need to get playerID to return data
import React, {useState, useEffect, useParams} from 'react';
import axios from 'axios';

const Player=()=>{
    const [player, setPlayer]=useState('');
    const [stats, setStats]=useState({});
    const [year, setYear]= useState(2000);


   const handleSubmit=(e)=>{
        e.preventDefault();
        getPlayer();
        console.log('SUBMITTING', player);
        
    }

    const handleChange = (e)=>{
        const splitting = e.target.value.split(" ").join("_");
        if (splitting.length > 0){
            setPlayer(splitting)

        } else{
            alert(' Please enter player name');
        }

    }
    
   useEffect(()=>{
    axios.get(`https://www.balldontlie.io/api/v1/players?search=${player}`)
    .then(  res=>{
        console.log('FROM ID CALL', res.data.data[0].id)
        setPlayer(res.data.data[0].id)
         
    })
    .catch(err=>{
        console.log(err)
    })
}, [player])

    const getPlayer=()=>{
        axios.get(`https://www.balldontlie.io/api/v1/season_averages?season=2002&player_ids[]=${player}`)
        .then(async res=>{
            console.log(res.data.data[0])
            setStats(res.data.data[0])
           
        })
        .catch(err =>{
            console.log(err)
        })
    }
   


    const getPlayerData=(PID)=> {
        
        axios.get(`https://www.balldontlie.io/api/v1/season_averages?season=2002&player_ids[]=${PID}`)
        .then(async res=>{
            console.log(res.data.data[0])
            setStats(res.data.data[0])
           
        })
        .catch(err =>{
            console.log(err)
        })
        
    
     }
      


    return(
        <div className="playerCont">
            Search a plyer's stats
            <div>
                <form onSubmit={handleSubmit}>
                    <label> Player:
                    <input type="text"
                    onChange={handleChange}
                
                    />
                    </label>
                    <input type="submit" value="Submit"/>
                </form>
               
            </div>
        </div>
    )
}

export default Player;