import { toast } from 'react-toastify';

export const noSeason= ()=>{
    toast("please enter a season")

}

export const yearFormat=()=>{
    toast(" please enter year 4 digit format")
}

export const pre1980=()=>{
    toast("please enter season after 1980")
}

export const noPlayer=()=>{
    toast("Please enter players name")
}

export const injuredPlayer= ()=>{
    toast("This player is injured or did not play this season")
}

export const dupePlayer=()=>{
    toast("Please specify player name")
}

export const genError=()=>{
    toast("Server Error, try again soon!")
}


////// MOBILE QUERY SIZES /////
const sizes = {
    
    largeVsInputs: '1083px',
    medBreak:'781px',
    smallHomeText:'430px',
    smallHeaderBreak: '415px',
    smallNavBreak:'410px',

    }

    export const breakpoints ={
        largeVsInputs: `(max-width: ${sizes.largeVsInputs})`,
        medBreak: `(max-width: ${sizes.medBreak})`,
        smallHomeText:`(max-width:${sizes.smallHomeText})`,
        smallHeaderBreak: `(max-width: ${sizes.smallHeaderBreak})`,
        smallNavBreak: `(max-width: ${sizes.smallNavBreak})`,
    
        }