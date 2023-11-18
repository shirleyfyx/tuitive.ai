import React from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

const ProfileChart = () => {
  const data = {
    labels: ['Math', 'Physics', 'Chemistry', 'Biology', 'English', 'Computer Science'],
    datasets: [
      {
        label: 'Past Exam Scores',
        data: [65, 59, 80, 81, 56, 55],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      }
    ]
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-avatar"></div>
      <h1>Shirley Fang</h1>
      <p>Curriculum: IB</p>
      <p>Grade: 9</p>
      <p>University Goal: University of Waterloo Computer Science</p>
      <p>Past Exams:</p>
      <div className="chart-container">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default ProfileChart;
