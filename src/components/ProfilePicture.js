import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ProfilePicture.css'; // Make sure this CSS file is in the same directory as this component

const ProfilePicture = () => {
  let navigate = useNavigate();

  const handleClick = () => {
    navigate('/metrics');
  };

  return (
    <div className="profile-picture-container">
      <button className="round-button" onClick={handleClick}>
        SF {/* SF initials inside the button */}
      </button>
    </div>
  );
};

export default ProfilePicture;
