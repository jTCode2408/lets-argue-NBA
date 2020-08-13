import React from 'react';
import MatrixCard from 'matrix-card';
import {withRouter} from 'react-router-dom';
import {HeadText, HeadCont, AppHeader} from './styles';

const Header = (props)=>{

    return(
<HeadCont>
        {props.location.pathname === '/player' || props.location.pathname === '/compare' ? 
        (
            <AppHeader>
<HeadText>
      Numbers (Never) Lie
      </HeadText>

            </AppHeader>
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

 <HeadText>
      Numbers (Never) Lie
      </HeadText>

</MatrixCard>
</div>
</div>
            )
    }
</HeadCont>

    )
}

export default withRouter(Header);