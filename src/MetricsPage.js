import React, { useState, useEffect } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import 'chart.js/auto';
import './MetricsPage.css'; // Ensure this CSS file is in the same directory
import NavigationButton from './components/NavigationButton'; // Adjust this path if necessary
import { useNavigate } from 'react-router-dom';

const MetricsPage = () => {
  // Function to handle chemistry topics scoring
  const handleChemistryChatScores = () => {
    // Random scores for the demo, ensuring a minimum of 20%
    return {
      'Atomic Structure': 20 + Math.floor(Math.random() * 80),
      'Chemical Bonding': 20 + Math.floor(Math.random() * 80),
      'Equilibrium': 20 + Math.floor(Math.random() * 80),
      'Acids & Bases': 20 + Math.floor(Math.random() * 80),
      'Organic Chemistry': 20 + Math.floor(Math.random() * 80),
      'Periodicity': 20 + Math.floor(Math.random() * 80),
      'Thermochemistry': 20 + Math.floor(Math.random() * 80),
      'Chemical Kinetics': 20 + Math.floor(Math.random() * 80)
    };
  };

  // State for the chemistry scores
  const [chemistryScores, setChemistryScores] = useState({});
  const [lowestGradeTopic, setLowestGradeTopic] = useState('');

  const navigate = useNavigate(); // Hook for navigation

  // Update scores and determine the lowest grade topic when the component mounts
  useEffect(() => {
    const scores = handleChemistryChatScores();
    setChemistryScores(scores);
    // Find the lowest grade topic
    const lowestTopic = Object.keys(scores).reduce((lowest, topic) => {
      return scores[lowest] < scores[topic] ? lowest : topic;
    }, Object.keys(scores)[0]);
    setLowestGradeTopic(lowestTopic);
  }, []);

  // Function to handle "Go Practice" button click
  const handleGoPractice = () => {
    navigate('/'); // Navigate to the main page
  };

  // Data for the Bar chart
  const barData = {
    labels: Object.keys(chemistryScores),
    datasets: [
      {
        label: 'Chemistry Scores',
        data: Object.values(chemistryScores),
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#FF9F40',
          '#C9CB3D',
          '#77D9F8'
        ],
        borderColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#FF9F40',
          '#C9CB3D',
          '#77D9F8'
        ],
        borderWidth: 1
      }
    ]
  };

  // Data for the Line chart (Overall Chemistry Grade)
  const lineData = {
    labels: ['Grade 9A', '9B', '10A', '10B', '11A', '11B', '12A', '12B'],
    datasets: [
      {
        label: 'Overall Chemistry Grade',
        data: [69, 85, 70, 88, 83, 94, 90, 96], // Ascending trend data
        fill: false,
        borderColor: '#007bff',
        tension: 0.1
      }
    ]
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true
      }
    },
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Chemistry Scores',
      },
    },
  };

  return (
    <div className="metrics-page">
      <NavigationButton path="/tutoring" buttonText="Tutoring Class" />
      <div className="avatar">SF</div> {/* SF initials inside the avatar div */}
      <h1>Shirley Fang</h1>
      <p>Curriculum: IB</p>
      <p>Grade: 11</p>
      <p>Subject: Chemistry</p>
      <p>University Goal: University of Waterloo Computer Science</p>
      <div className="chart-container">
        <Bar data={barData} options={options} />
      </div>
      <div className="study-prompt">
        <p><b>Want to study more about {lowestGradeTopic}?</b></p>
        <button className="go-practice-btn" onClick={handleGoPractice}>Go Practice!</button>
      </div>
      <p className="overall-trend-title">Overall Chemistry Grade Trend:</p>
      <div className="chart-container">
        <Line data={lineData} options={options} />
      </div>
    </div>
  );
};

export default MetricsPage;
