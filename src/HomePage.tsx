import React from 'react';
import CurrentWeather from './components/CurrentWeather';
import styles from './HomePage.module.css';

interface Props {
  setUnit: (unit: string) => void;
  unit: string;
}

const HomePage: React.FC<Props> = ({ setUnit, unit }) => {
  return (
    <div className={styles.homePage}>
    
      <div className={styles.unitToggle}>
        <button onClick={() => setUnit('metric')}>Celsius</button>
        <button onClick={() => setUnit('imperial')}>Fahrenheit</button>
      </div>
      <CurrentWeather unit={unit} />
    </div>
  );
};

export default HomePage;
