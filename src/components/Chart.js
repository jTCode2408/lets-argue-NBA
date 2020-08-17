import React from 'react';
import {defaults, Bar} from 'react-chartjs-2'

const Chart = ({data})=>{
  const labelColors={

    labels:{
        fontColor:'rgba(85,37,130)'
    }
  }

  defaults.global.defaultFontColor = 'rgba(42,40,45)';
  defaults.global.defaultFontSize = 14;
  defaults.global.defaultFontStyle = 'bold';

  
    return <Bar 
    data={data} 
    height= {30} 
    width= {50}
    
    options={{  responsive: true}} />
    
}

export default Chart;

//chart styles, bar colors, label names changed possibly?