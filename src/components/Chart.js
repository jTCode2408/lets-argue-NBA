import React from 'react';
import {Line, Bar} from 'react-chartjs-2'

const Chart = ({data})=>{



    return <Bar data={data} options={{ responsive: true, height: '500px', width: "400px" }} />
    
}

export default Chart;

//chart styles, bar colors, label names changed possibly?