import styled from "styled-components";
import {breakpoints} from './Helpers';

export const AppHeader=styled.header`
    background-color: rgba(42,40,45);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 2rem;
    color: white;
    max-width:100%;
    font-family: 'Permanent Marker', cursive;

`

export const HeadCont=styled.div`
display:flex;
justfiy-content:center;
align-content:center;
align-items:center;


`

export const HeadText=styled.div`
font-weight:bold;
font-size:4rem;
margin:5%;
text-transform:uppercase;

@media ${breakpoints.smallHeaderBreak}{
    font-size:3rem;
    margin: 0 auto;

}

`

export const NavCont = styled.div`
display:flex;
justify-content: center;
align-content: center;
align-items:center;
background-color: rgb(25, 24, 26);
font-family: 'Markazi Text', serif;
font-size:1.5rem;


@media ${breakpoints.smallNavBreak}{
    font-size:1.2rem
}
`

export const HomeCont=styled.div`
display:flex;
flex-direction:column;
justify-content: center;
align-content: center;
`

export const HomeHeader =styled.div`
font-size:5rem;
text-transform:uppercase;
color:#000;
margin:2% 0;
font-family: 'Special Elite', cursive;
@media ${breakpoints.smallHomeText}{
    margin:2%;
}

`

export const Intro=styled.div`
display:flex;
flex-direction:column;
justify-content: center;
align-content: center;
align-items:center;
color:#A9A9A9;
font-weight:bold;
margin-bottom:6%;
font-family: 'Markazi Text', serif;
font-size:1.5rem;

@media ${breakpoints.smallHomeText}{
    margin:4%;
}


`
export const PlayerCont=styled.div`
margin:2%;
display:flex;
flex-direction:column;
justify-content: center;
align-content: center;
`
export const PlayerHead=styled.div`
margin-bottom:2%;
font-size:2rem;
font-family: 'Special Elite', cursive;
`
export const PlayerInput=styled.div`
display:flex;
justify-content: center;
align-content: center;

`

export const SinglePlayerGraph=styled.div`
border:3px solid black;
margin-bottom: 1%;
`
export const PlayerResults=styled.div`
margin:1%;
`


export const PreSubmit=styled.div`
font-size:1.5rem;
margin-bottom:1%;
font-family: 'Special Elite', cursive;
`


export const VsCont = styled.div`

display:flex;
flex-direction:column;
justify-content: center;
align-content: center;
margin:2%;

`

export const VsHead = styled.div`
font-family: 'Special Elite', cursive;
margin-bottom:2%;
font-size:2rem;
`

export const VsInputsDiv=styled.div`

display:flex;
justify-content: center;
align-content: center;

@media ${breakpoints.largeVsInputs}{
    flex-direction:column;
}

`

export const VSResults=styled.div`
margin:1%;

`

export const BothGraphsCont=styled.div`

width:100%;
height:auto;
flex-direction:row;
justify-content: center;
align-content: center;
align-items:center;
margin-bottom: 1%;

`

export const P1GraphCont=styled.div`
border:3px solid black;
margin-bottom: 1%;
`

export const P2GraphCont=styled.div`
border:3px solid black;
margin-top: 1%;

`

export const ToggledCont=styled.div`

width:100%;
height:auto;
flex-direction:row;
display:flex;
margin-bottom: 1%;

@media ${breakpoints.medBreak}{
    display:none;
}

`

export const P1Toggled=styled.div`
border:3px solid black;
width:50%;

`
export const P2Toggled=styled.div`
border:3px solid black;
width:50%;

`