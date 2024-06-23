// import React, { useState } from 'react';
// import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
// import HomePage from './HomePage';
// import HourlyForecastPage from './pages/HourlyForecastPage';
// import DailyForecastPage from './pages/DailyForecastPage';
// import SearchCityPage from './pages/SearchCityPage';
// import ToggleUnit from './components/ToggleUnit';

// const App: React.FC = () => {
//   const [unit, setUnit] = useState<string>('metric');

//   const toggleUnit = () => {
//     setUnit(unit === 'metric' ? 'imperial' : 'metric');
//   };

//   return (
//     <Router>
//       <div>
//         <nav>
//           <Link to="/">Home</Link>
//           <Link to="/hourly">Hourly Forecast</Link>
//           <Link to="/daily">5-Day Forecast</Link>
//           <Link to="/search">Search City</Link>
//         </nav>
//         <ToggleUnit toggleUnit={toggleUnit} unit={unit} />
//         <Routes>
//           <Route path="/" element={<HomePage unit={unit} />} />
//           <Route path="/hourly" element={<HourlyForecastPage unit={unit} />} />
//           <Route path="/daily" element={<DailyForecastPage unit={unit} />} />
//           <Route path="/search" element={<SearchCityPage />} />
//         </Routes>
//       </div>
//     </Router>
//   );
// };

// export default App;
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import CurrentWeather from './components/CurrentWeather';
import HourlyForecast from './components/HourlyForecast';
import DailyForecast from './components/DailyForecast';
import SearchCityPage from './components/SearchCity';
import styles from './App.module.css';
import Navbar from './Navbar';
import HomePage from './HomePage';

const App: React.FC = () => {
  const [unit, setUnit] = React.useState<string>('metric');

  return (
    <div className={styles.app}>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage setUnit={setUnit} unit={unit} />} />
          <Route path="/hourly" element={<HourlyForecast unit={unit} />} />
          <Route path="/daily" element={<DailyForecast unit={unit} />} />
          <Route path="/search" element={<SearchCityPage />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
