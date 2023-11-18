import React from 'react';
import { useNavigate } from 'react-router-dom';
import './NavigationButton.css'; // Import the CSS file

const NavigationButton = ({ path }) => {
  let navigate = useNavigate();

  const handleClick = () => {
    navigate('/');
  };

  return (
    <button className="navigation-button" onClick={handleClick}>
      Tutoring Class
    </button>
  );
};

export default NavigationButton;
