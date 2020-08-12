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