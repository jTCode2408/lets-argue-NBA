import React from 'react';
import MatrixCard from 'matrix-card';
import {Route, Switch, withRouter} from 'react-router-dom';

const Header = (props)=>{

    return(
<>
        {props.location.pathname === '/player' || props.location.pathname === '/compare' ? 
        (
            null
        )
            :

            (
    <div style={{
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		}}>
	<div>
<MatrixCard 
  id={"matrix-id"}
  matrixText={"0154%8648%974"}
  delay={30}
  backgroundColor={"rgba(42,40,45)"}
  textFontSize={"14"}
  textMainColor={"#000000"}
  textAlternateColorList={["#808080", "#989889", "#A9A9A9", "#C0C0C0"]}
  textAlternateColorRatio={0.1}
  canvasSize={{width:(window.innerWidth-80), height:330}}
  styleOverrideForChildrenDiv={{backgroundColor: 'none'}}

>

 <div className="head-text">
      Numbers (Never) Lie
      </div>

</MatrixCard>
</div>
</div>
            )
    }
</>

    )
}

export default withRouter(Header);