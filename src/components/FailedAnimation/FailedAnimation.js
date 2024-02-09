import React from 'react';
import { FaTimesCircle } from 'react-icons/fa';
import './FailedAnimation.css'; // Import the CSS file for the animation

const FailedAnimation = () => {
  return (
    <div className="tick-animation">
      <h5 style={{ color: '#b50505' }}>Voucher Generation Failed</h5>
      <div className="tick-icon">
        <FaTimesCircle size={30} color="#b50505" />
      </div>
    </div>
  );
};
export default FailedAnimation