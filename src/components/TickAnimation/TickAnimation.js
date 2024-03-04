import React from 'react';
import { FaCheck } from 'react-icons/fa';
import './TickAnimation.css'; // Import the CSS file for the animation

const TickAnimation = ({message}) => {
  return (
    <div className="tick-animation">
      <h5 style={{ color: '#55b505' }}>{message}</h5>
      <div className="tick-icon">
        <FaCheck color="#55b505" size={30} />
      </div>
    </div>
  );
};
export default TickAnimation