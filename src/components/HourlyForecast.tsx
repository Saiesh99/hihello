// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// interface Props {
//   unit: string;
// }

// interface HourlyData {
//   dt: number;
//   main: {
//     temp: number;
//   };
//   weather: {
//     description: string;
//     icon: string;
//   }[];
// }

// const HourlyForecast: React.FC<Props> = ({ unit }) => {
//   const [hourlyData, setHourlyData] = useState<HourlyData[]>([]);

//   useEffect(() => {
//     navigator.geolocation.getCurrentPosition((position) => {
//       const { latitude, longitude } = position.coords;
//       const apiKey = 'b76f63924fc1227699172657e127c060';
//       const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=${unit}&appid=${apiKey}`;

//       axios.get(apiUrl)
//         .then(response => {
//           setHourlyData(response.data.list.slice(0, 8)); // Get first 8 entries (24 hours, 3-hour intervals)
//         })
//         .catch(error => {
//           console.error('Error fetching hourly data:', error);
//         });
//     });
//   }, [unit]);

//   return (
//     <div>
//       {hourlyData.map((hour) => (
//         <div key={hour.dt}>
//           <div>Time: {new Date(hour.dt * 1000).toLocaleTimeString()}</div>
//           <div>Temperature: {hour.main.temp}°{unit === 'metric' ? 'C' : 'F'}</div>
//           <div>Description: {hour.weather[0].description}</div>
//           <div>
//             <img src={`http://openweathermap.org/img/wn/${hour.weather[0].icon}@2x.png`} alt="weather icon" />
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default HourlyForecast;

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import styles from './HourlyForecast.module.css';

// const API_KEY = 'b76f63924fc1227699172657e127c060'; // Replace with your OpenWeatherMap API key

// interface Props {
//   unit: string;
// }

// const HourlyForecast: React.FC<Props> = ({ unit }) => {
//   const [forecastData, setForecastData] = useState<any>(null);
//   const [error, setError] = useState<string>('');

//   useEffect(() => {
//     navigator.geolocation.getCurrentPosition(async (position) => {
//       try {
//         const response = await axios.get(
//           `https://api.openweathermap.org/data/2.5/forecast?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=${unit}&appid=${API_KEY}`
//         );
//         setForecastData(response.data);
//         setError('');
//       } catch (err) {
//         setError('Error fetching forecast data');
//         setForecastData(null);
//       }
//     });
//   }, [unit]);

//   return (
//     <div className={styles.container}>
//       {error && <p>{error}</p>}
//       {forecastData && (
//         <div>
//           <h2>Hourly Forecast</h2>
//           {forecastData.list.slice(0, 24).map((item: any, index: number) => (
//             <div key={index} className={styles.forecastInfo}>
//               <p>Time: {new Date(item.dt * 1000).toLocaleTimeString()}</p>
//               <p>Temperature: {item.main.temp}°C</p>
//               <p>Weather: {item.weather[0].description}</p>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default HourlyForecast;



import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './HourlyForecast.module.css';

interface Props {
  unit: string;
}

interface HourlyData {
  dt: number;
  main: {
    temp: number;
  };
  weather: {
    description: string;
    icon: string;
  }[];
}

const HourlyForecast: React.FC<Props> = ({ unit }) => {
  const [hourlyData, setHourlyData] = useState<HourlyData[]>([]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      const apiKey = 'b76f63924fc1227699172657e127c060';
      const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=${unit}&appid=${apiKey}`;

      axios.get(apiUrl)
        .then(response => {
          setHourlyData(response.data.list.slice(0, 8)); // Get first 8 entries (24 hours, 3-hour intervals)
        })
        .catch(error => {
          console.error('Error fetching hourly data:', error);
        });
    });
  }, [unit]);

  return (
    <div className={styles.container}>
      <h2>Hourly Forecast</h2>
      <div className={styles.hourly}>
        {hourlyData.map((hour) => (
          <div key={hour.dt} className={styles.hourlyItem}>
            <div>Time: {new Date(hour.dt * 1000).toLocaleTimeString()}</div>
            <div>Temperature: {hour.main.temp}°{unit === 'metric' ? 'C' : 'F'}</div>
            <div>Description: {hour.weather[0].description}</div>
            <div>
              <img src={`http://openweathermap.org/img/wn/${hour.weather[0].icon}@2x.png`} alt="weather icon" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HourlyForecast;
