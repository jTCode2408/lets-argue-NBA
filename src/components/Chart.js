import React from 'react';
import {defaults, Bar} from 'react-chartjs-2'

const Chart = ({data})=>{

    return <Bar data={data} 
    height= {20} 
    width= {50}
    options={{height:"500px", responsive: true,  }} />
    
}

export default Chart;

//chart styles, bar colors, label names changed possibly?