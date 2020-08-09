import React from 'react';
import {Line, Bar} from 'react-chartjs-2'

const Chart = ({data})=>{

    console.log("DATA FROM CHART COMP", data)

    return <Bar data={data} options={{ responsive: true, height: '600px', width: "600px" }} />
    
}

export default Chart;