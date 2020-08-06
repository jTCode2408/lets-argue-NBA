//if seraching single player
//add to Home page, will be main basic app functionality
// api/v1/season_averages?season=2018&player_ids[]=1&player_ids[]=2 will return regular season averages for player_ids 1 and 2. ONLY NEED 1 PLAYER HERE
//ALLOW SEASON DROPDOWN
import React, {useState, useEffect, useParams} from 'react';
import axios from 'axios';

const Player=()=>{
    const [player, setPlayer]=useState('');
    const [year, setYear]= useState(2020);
    
    

   const handleSubmit=(e)=>{
        e.preventDefault();
        setPlayer(player)
    }

    const handleChange = (e)=>{
        const splitting = e.target.value.split(" ").join("_");
        if (splitting.length > 0){
            setPlayer({player: splitting})

        } else{
            alert(' Please enter player name');
        }

    }
    
    const getPlayer= useEffect((player)=>{
        axios.get('https://www.balldontlie.io/api/v1/season_averages?season=2006&player_ids[]=237')
        .then(res=>{
            console.log(res.data.data)
            setPlayer(res.data.data[0])
           
        })
        .catch(err =>{
            console.log(err)
        })
        
     }, [])
    



    return(
        <div className="playerCont">
            Search a plyer's stats
            <div>
                <form onSubmit={handleSubmit}>
                    <input type="text"
                    
                    onChange={handleChange}
                    />
                </form>
            </div>
        </div>
    )
}

export default Player;