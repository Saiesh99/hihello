// import React, { useState } from 'react';
// import axios from 'axios';

// // interface Props {
// //   unit: string;
// // }

// interface WeatherData {
//   dt: number;
//   main: {
//     temp: number;
//   };
//   weather: {
//     description: string;
//     icon: string;
//   }[];
// }

// const SearchCity: React.FC = () => {
//   const [city, setCity] = useState<string>('');
//   const [weatherData, setWeatherData] = useState<WeatherData[]>([]);
//   const [dailyData, setDailyData] = useState<WeatherData[]>([]);
//   const [unit, setUnit] = useState<string>('metric');
//   const [error, setError] = useState<string>('');

//   const handleSearch = () => {
//     const apiKey = 'b76f63924fc1227699172657e127c060';
//     console.log(unit);
//     const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${unit}&appid=${apiKey}`;

//     axios.get(apiUrl)
//       .then(response => {
//         setWeatherData(response.data.list.slice(0, 5));
//         setDailyData(response.data.list.filter((item: any) => new Date(item.dt * 1000).getHours() === 0));
//         setError('');
//       })
//       .catch(error => {
//         console.error('Error fetching city weather data:', error);
//         setError('City not found or API request failed');
//         setWeatherData([]);
//         setDailyData([]);
//       });
//   };

//   return (
//     <div>
//       <input type="text" value={city} onChange={(e) => setCity(e.target.value)} placeholder="Enter city" />
//       <button onClick={handleSearch}>Search</button>
//       {error && <div>{error}</div>}
//       <div>
//         {weatherData.map((weather) => (
//           <div key={weather.dt}>
//             <div>Time: {new Date(weather.dt * 1000).toLocaleTimeString()}</div>
//             <div>Temperature: {weather.main.temp}°{unit === 'metric' ? 'C' : 'F'}</div>
//             <div>Description: {weather.weather[0].description}</div>
//             <div>
//               <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="weather icon" />
//             </div>
//           </div>
//         ))}
//       </div>
//       <div>
//         {dailyData.map((weather) => (
//           <div key={weather.dt}>
//             <div>Date: {new Date(weather.dt * 1000).toLocaleDateString()}</div>
//             <div>Temperature: {weather.main.temp}°{unit === 'metric' ? 'C' : 'F'}</div>
//             <div>Description: {weather.weather[0].description}</div>
//             <div>
//               <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`} alt="weather icon" />
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };


import React, { useState } from 'react';
import axios from 'axios';
import styles from './SearchCity.module.css';

interface WeatherData {
  dt: number;
  main: {
    temp: number;
  };
  weather: {
    description: string;
    icon: string;
  }[];
}

const SearchCity: React.FC = () => {
  const [city, setCity] = useState<string>('');
  const [weatherData, setWeatherData] = useState<WeatherData[]>([]);
  const [unit, setUnit] = useState<string>('metric');
  const [error, setError] = useState<string>('');

  const handleSearch = () => {
    const apiKey = 'b76f63924fc1227699172657e127c060';
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${unit}&appid=${apiKey}`;

    axios.get(apiUrl)
      .then(response => {
        const data = response.data.list;
        setWeatherData(data);
        setError('');
      })
      .catch(error => {
        console.error('Error fetching city weather data:', error);
        setError('City not found or API request failed');
        setWeatherData([]);
      });
  };

  const toggleUnit = () => {
    setUnit(unit === 'metric' ? 'imperial' : 'metric');
    const updatedData = weatherData.map((item) => {
      if (unit === 'metric') {
        return { ...item, main: { ...item.main, temp: (item.main.temp * 9) / 5 + 32 } };
      } else {
        return { ...item, main: { ...item.main, temp: ((item.main.temp - 32) * 5) / 9 } };
      }
    });
    setWeatherData(updatedData);
  };

  const groupByDay = (data: WeatherData[]) => {
    const grouped: { [key: string]: WeatherData[] } = {};
    data.forEach(item => {
      const date = new Date(item.dt * 1000).toLocaleDateString();
      if (!grouped[date]) {
        grouped[date] = [];
      }
      grouped[date].push(item);
    });
    return grouped;
  };

  return (
    <div className={styles.searchCityContainer}>
      <div className={styles.inputGroup}>
        <input 
          type="text" 
          value={city} 
          onChange={(e) => setCity(e.target.value)} 
          placeholder="Enter city" 
        />
        <button onClick={handleSearch}>Search</button>
        <button onClick={toggleUnit}>Toggle Unit</button>
      </div>
      {error && <div className={styles.errorMessage}>{error}</div>}
      {Object.entries(groupByDay(weatherData)).map(([date, group]) => (
        <div key={date} className={styles.weatherDay}>
          <h2>{date}</h2>
          <div className={styles.weatherDetails}>
            {group.map((weather) => (
              <div key={weather.dt} className={styles.weatherDetail}>
                <div>Time: {new Date(weather.dt * 1000).toLocaleTimeString()}</div>
                <div>Temperature: {weather.main.temp.toFixed(2)}°{unit === 'metric' ? 'C' : 'F'}</div>
                <div>Description: {weather.weather[0].description}</div>
                <div>
                  <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`} alt="weather icon" />
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SearchCity;




