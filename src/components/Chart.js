import React from 'react';
import {defaults, Bar} from 'react-chartjs-2'

const Chart = ({data})=>{

    return <Bar 
    data={data} 
    height= {30} 
    width= {90}
    
    options={{ responsive: true}} />
    
}

export default Chart;

//chart styles, bar colors, label names changed possibly?