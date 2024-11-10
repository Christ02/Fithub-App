import React from 'react';
import SleepComponent from '../../components/Sleep/SleepComponent';
import Navbar from '../../components/Navbar/Navbar'; 

const SleepPage = () => {
  const userId = 1; 

  return (
    <div>
      <Navbar /> 
      <SleepComponent userId={userId} />
    </div>
  );
};

export default SleepPage;