import React from 'react';
import SleepComponent from '../../components/Sleep/SleepComponent';

const SleepPage = () => {
    const userId = 4;

    return (
    <div>
      <SleepComponent userId={userId} />
    </div>
  );
};

export default SleepPage;
