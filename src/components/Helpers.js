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

//BREAKPOINTS//
//917PX VS form inputs break
///888PX & BELOW: Nav breaks, vs form inputs
//765 side by side font size
///728PX & BELOW: Single player form breaks
//611& BELOW: player form breaks again(double line), vs form breaks
//590 NAV BREAK
//464 vs form break
//vs forms too small(display none)
//414PX & below: nav breaks again (single/doulbe vert stacked graph small, but still ok)
////// MOBILE QUERY SIZES /////
const sizes = {
    largeVsInputs: '917px',
    largeNavBreak:'888px',
    medVsFonts:'765px',
    medPlayerInputs:'728px',
    medFormInputs:'611px',
    medNavBreak:'590px',
    smallVsForm:'464px',
    smallNavBreak:'414px',

    
    }

    export const breakpoints ={
        largeVsInputs: `(max-width: ${sizes.largeVsInputs})`,
        largeNavBreak: `(max-width: ${sizes.largeNavBreak})`,
        medVsFonts: `(max-width: ${sizes.medVsFonts})`,
        medPlayerInputs: `(max-width: ${sizes.medPlayerInputs})`,
        medFormInputs: `(max-width: ${sizes.medFormInputs})`,
        medNavBreak: `(max-width: ${sizes.medNavBreak})`,
        smallVsForm:`(max-width: ${sizes.smallVsForm})`,
        smallNavBreak: `(max-width: ${sizes.smallNavBreak})`,
    
        }