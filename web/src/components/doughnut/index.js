import React, { useState, useEffect } from "react";
import { Doughnut } from "react-chartjs-2";

import './styles.css';

const DoughnutChart = (data) => {
  
  const { users } = data

  const [chartData, setChartData] = useState({});

  useEffect(() => {
    
      const configs = {
        labels: [],
        datasets: [{
          label: 'Participation',
          data: [],
          backgroundColor: [],
          borderWidth: 2,
					pointStyle: 'rectRot',
					pointRadius: 5,
          pointBorderColor: 'rgb(0, 0, 0)',
        }]
      }
    
      users.map(user => {
        configs.labels.push(`${user.firstName} ${user.lastName}`);
        configs.datasets[0].data.push(user.participation);

        if(user.id == null) {
          return configs.datasets[0].backgroundColor.push(`#dadada`);

        } else {
          return configs.datasets[0].backgroundColor.push(
            `#${parseInt(Math.random() * 0xffffff).toString(16)}`
          );

        }               
      });

      setChartData(configs)
  }, [users]);

  return (
    <div className="chart">
      <Doughnut
      data={chartData}
      options={{
        responsive: true,
        title: {
          display: false,
          text: 'Chart.js Doughnut Chart'
        },
        legend: {
          position: 'right',
          labels: {
            boxWidth: 24,
            fontSize:14,
            padding: 30
          }
        },
        animation: {
          animateScale: true,
          animateRotate: true
        }
      }}
    />
    </div>
    
  );
};

export default DoughnutChart;