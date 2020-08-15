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
    galaxy: '360px',
    xs:'376px',
    small:'390px',
    xsMax: '420px',
    midBreak: '458px',
    mobile: '470px',
    medium:'520px',
    ipadPro: '834px',
    kindle: '800px',
    ipad:'768px',
    mainBreak:`1000px`
    
    }

    export const breakpoints ={
        galaxy: `(max-width: ${sizes.galaxy})`,
        xs: `(max-width: ${sizes.xs})`,
        small: `(max-width: ${sizes.small})`,
        xsMax: `(max-width: ${sizes.xsMax})`,
        midBreak: `(max-width: ${sizes.midBreak})`,
        mobile: `(max-width: ${sizes.mobile})`,
        medium:`(max-width: ${sizes.medium})`,
        ipad: `(max-width: ${sizes.ipad})`,
        ipadPro: `(max-width: ${sizes.ipadPro})`,
        kindle:`(max-width: ${sizes.kindle})`,
        mainBreak:`(max-width:${sizes.mainBreak} )`
        }