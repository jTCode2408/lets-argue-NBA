import React from 'react';
import {defaults, Bar} from 'react-chartjs-2'
//do mixed chart here for player comparison

const MixedChart = ({data})=>{

    const data={
        
    }

    const options = {
        responsive: true,
        tooltips: {
          mode: 'label'
        },
        elements: {
          bar: {
            fill: true
          }
        },
        scales: {
          xAxes: [
            {
              display: true,
              gridLines: {
                display: false
              },
              labels: {
                show: true
              }
            }
          ],
          yAxes: [
            {
              type: 'linear',
              display: true,
              position: 'left',
              id: 'y-axis-1',
              gridLines: {
                display: false
              },
              labels: {
                show: true
              }
            },
            {
              type: 'linear',
              display: true,
              position: 'right',
              id: 'y-axis-2',
              gridLines: {
                display: false
              },
              labels: {
                show: true
              }
            }
          ]
        }
      };
      

    return <Bar 
    data={data} 
    height= {30} 
    width= {50}
    
    options={options} />
    
}

export default MixedChart;

//2dif colors for players, will render 1 chart, calling both player's data