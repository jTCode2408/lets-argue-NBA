//if seraching single player
//add to Home page, will be main basic app functionality
// api/v1/season_averages?season=2018&player_ids[]=1&player_ids[]=2 will return regular season averages for player_ids 1 and 2. ONLY NEED 1 PLAYER HERE
//ALLOW SEASON DROPDOWN
//need to get playerID to return data
import React, {useState, useEffect, useParams} from 'react';
import axios from 'axios';

const Player=()=>{
    const [player, setPlayerId]=useState('');
    const [year, setYear]= useState(2000);
    
    

   const handleSubmit=(e)=>{
        e.preventDefault();
        getPlayerId();
        
    }

    const handleChange = (e)=>{
        const splitting = e.target.value.split(" ").join("_");
        if (splitting.length > 0){
            setPlayerId({ player: splitting})

        } else{
            alert(' Please enter player name');
        }

    }
    
   const getPlayerId=()=>{
    axios.get(`https://www.balldontlie.io/api/v1/players?search=${player}`)
    .then(res=>{
        console.log(res.data.data)
         //await getPlayer(res.data.data[0].id)
    })
    .catch(err=>{
        console.log(err)
    })

   }


    const getPlayer=(playerId)=> {
        
        axios.get(`https://www.balldontlie.io/api/v1/season_averages?season=2002&player_ids[]=${playerId}`)
        .then(res=>{
            console.log(res.data.data[0])
            setPlayerId(res.data.data[0])
           
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
                    <label> Name
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