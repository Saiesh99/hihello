import React from 'react';
import CurrentWeather from '../components/CurrentWeather';

interface Props {
  unit: string;
}

const Home: React.FC<Props> = ({ unit }) => {
  return (
    <div>
      <h1>Current Weather</h1>
      <CurrentWeather unit={unit} />
    </div>
  );
};

export default Home;
