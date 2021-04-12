import React from 'react';
import {
  Bar
} from 'react-chartjs-2';

const state ={
  labels: ['Date 1', ' Date 2', 'Date 3', 'Date 4', 'Date 5'],
  datasets:[
    {
      label: 'User Info',
      backgroundColor: 'rgba(51, 134, 255)',
      borderColor: 'rgba(0,0,0,1)',
      borderWidth: 2,
      data:[2, 3, 1, 0, 4]
    }
  ]
}
export default class InfoGraph extends React.Component {
  render(){
  return (
    <div>
      <Bar
      data = {state}
      options={ { maintainAspectRatio: false },{
        title:{
          display: true,
          text: 'Number of Problems Posted by You',
          fontSize: 20
        },
        legend:{
          display:true,
          position:'right'
        },
       
      }}/>
     
    </div>
  )
}
}