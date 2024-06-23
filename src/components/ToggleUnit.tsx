import React from 'react';

interface Props {
  toggleUnit: () => void;
  unit: string;
}

const ToggleUnit: React.FC<Props> = ({ toggleUnit, unit }) => {
  return (
    <button onClick={toggleUnit}>
      Switch to {unit === 'metric' ? 'Fahrenheit' : 'Celsius'}
    </button>
  );
};

export default ToggleUnit;
