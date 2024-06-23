import React from 'react';
import HourlyForecast from '../components/HourlyForecast';

interface Props {
  unit: string;
}

const HourlyForecastPage: React.FC<Props> = ({ unit }) => {
  return (
    <div>
      <h1>Hourly Forecast</h1>
      <HourlyForecast unit={unit} />
    </div>
  );
};

export default HourlyForecastPage;
