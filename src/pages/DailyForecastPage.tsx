import React from 'react';
import DailyForecast from '../components/DailyForecast';

interface Props {
  unit: string;
}

const DailyForecastPage: React.FC<Props> = ({ unit }) => {
  return (
    <div>
      <h1>5-Day Forecast</h1>
      <DailyForecast unit={unit} />
    </div>
  );
};

export default DailyForecastPage;
