// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import styles from './CurrentWeather.module.css';

// interface Props {
//   unit: string;
// }

// interface WeatherData {
//   main: {
//     temp: number;
//   };
//   weather: {
//     description: string;
//     icon: string;
//   }[];
//   name:string;
// }

// const CurrentWeather: React.FC<Props> = ({ unit }) => {
//   const [weatherData, setWeatherData] = useState<WeatherData | null>(null);

//   useEffect(() => {
//     navigator.geolocation.getCurrentPosition((position) => {
//       const { latitude, longitude } = position.coords;
//       const apiKey = 'b76f63924fc1227699172657e127c060';
//       const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=${unit}&appid=${apiKey}`;

//       axios.get(apiUrl)
//         .then(response => {
//           setWeatherData(response.data);
//         })
//         .catch(error => {
//           console.error('Error fetching weather data:', error);
//         });
//     });
//   }, [unit]);

//   if (!weatherData) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div>
//       <div>Temperature: {weatherData.main.temp}°{unit === 'metric' ? 'C' : 'F'}</div>
//       <div>Description: {weatherData.weather[0].description}</div>
//       <div>Place: {weatherData.name}</div>
//       <div>
//         <img src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} alt="weather icon" />
//       </div>
//     </div>
//   );
// };

// export default CurrentWeather;


// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import styles from './CurrentWeather.module.css';

// const API_KEY = 'b76f63924fc1227699172657e127c060'; // Replace with your OpenWeatherMap API key

// interface Props {
//   unit: string;
// }

// const CurrentWeather: React.FC<Props> = ({ unit }) => {
//   const [weatherData, setWeatherData] = useState<any>(null);
//   const [error, setError] = useState<string>('');

//   useEffect(() => {
//     navigator.geolocation.getCurrentPosition(async (position) => {
//       try {
//         const response = await axios.get(
//           `https://api.openweathermap.org/data/2.5/forecast?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=${unit}&appid=${API_KEY}`
//         );
//         setWeatherData(response.data);
//         setError('');
//       } catch (err) {
//         setError('Error fetching weather data');
//         setWeatherData(null);
//       }
//     });
//   }, [unit]);

//   return (
//     <div className={styles.container}>
//       {error && <p>{error}</p>}
//       {weatherData && (
//         <div className={styles.weatherInfo}>
//           <h2>Current Weather in {weatherData.city.name}</h2>
//           <p className={styles.temperature}>
//             Temperature: {weatherData.list[0].main.temp}°C
//           </p>
//           <p>Weather: {weatherData.list[0].weather[0].description}</p>
//           <img
//             className={styles.weatherIcon}
//             src={`http://openweathermap.org/img/wn/${weatherData.list[0].weather[0].icon}.png`}
//             alt="weather icon"
//           />
//         </div>
//       )}
//     </div>
//   );
// };

// export default CurrentWeather;

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import styles from './CurrentWeather.module.css';

// const API_KEY = 'b76f63924fc1227699172657e127c060'; // Replace with your OpenWeatherMap API key

// interface Props {
//   unit: string;
// }

// const CurrentWeather: React.FC<Props> = ({ unit }) => {
//   const [weatherData, setWeatherData] = useState<any>(null);
//   const [error, setError] = useState<string>('');

//   useEffect(() => {
//     navigator.geolocation.getCurrentPosition(async (position) => {
//       try {
//         const response = await axios.get(
//           `https://api.openweathermap.org/data/2.5/forecast?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=${unit}&appid=${API_KEY}`
//         );
//         setWeatherData(response.data);
//         setError('');
//       } catch (err) {
//         setError('Error fetching weather data');
//         setWeatherData(null);
//       }
//     });
//   }, [unit]);

//   return (
//     <div className={styles.container}>
//       {error && <p>{error}</p>}
//       {weatherData && (
//         <div className={styles.weatherInfo}>
//           <h2>Current Weather in {weatherData.city.name}</h2>
//           <p className={styles.temperature}>
//             Temperature: {weatherData.list[0].main.temp}°C
//           </p>
//           <p>Weather: {weatherData.list[0].weather[0].description}</p>
//           <img
//             className={styles.weatherIcon}
//             src={`http://openweathermap.org/img/wn/${weatherData.list[0].weather[0].icon}.png`}
//             alt="weather icon"
//           />
//         </div>
//       )}
//     </div>
//   );
// };

// export default CurrentWeather;



// CurrentWeather.tsx

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import styles from './CurrentWeather.module.css';

// interface Props {
//   unit: string;
// }

// interface WeatherData {
//   list: {
//     main: {
//       temp: number;
//     };
//     weather: {
//       description: string;
//       icon: string;
//     }[];
//     dt_txt: string;
//   }[];
//   city: {
//     name: string;
//   };
// }

// const CurrentWeather: React.FC<Props> = ({ unit }) => {
//   const [weatherData, setWeatherData] = useState<WeatherData | null>(null);

//   useEffect(() => {
//     navigator.geolocation.getCurrentPosition((position) => {
//       const { latitude, longitude } = position.coords;
//       const apiKey = 'b76f63924fc1227699172657e127c060';
//       const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=${unit}&appid=${apiKey}`;

//       axios.get(apiUrl)
//         .then(response => {
//           setWeatherData(response.data);
//         })
//         .catch(error => {
//           console.error('Error fetching weather data:', error);
//         });
//     });
//   }, [unit]);

//   if (!weatherData) {
//     return <div>Loading...</div>;
//   }

//   // Filter hourly data for the next 24 hours (current hour + 23 hours)
//   const hourlyData = weatherData.list.filter((data) => {
//     const dt = new Date(data.dt_txt);
//     const currentDt = new Date();
//     return dt >= currentDt && dt.getHours() < currentDt.getHours() + 24;
//   });

//   // Group hourly data by date
//   const groupedHourlyData: { [key: string]: WeatherData['list'] } = {};
//   hourlyData.forEach((data) => {
//     const date = new Date(data.dt_txt).toLocaleDateString();
//     if (!groupedHourlyData[date]) {
//       groupedHourlyData[date] = [];
//     }
//     groupedHourlyData[date].push(data);
//   });

//   return (
//     <div className={styles.container}>
//       <div className={styles.current}>
//         <h2>Current Weather in your location</h2>
//         <div>Temperature: {weatherData.list[0].main.temp}°{unit === 'metric' ? 'C' : 'F'}</div>
//         <div>Description: {weatherData.list[0].weather[0].description}</div>
//         <div>Place: {weatherData.city.name}</div>
//         <div>
//           <img src={`http://openweathermap.org/img/wn/${weatherData.list[0].weather[0].icon}.png`} alt="weather icon" />
//         </div>
//       </div>
//       <div className={styles.hourlyForecast}>
//         <h2>Hourly Forecast</h2>
//         {Object.entries(groupedHourlyData).map(([date, hourlyForecast]) => (
//           <div key={date} className={styles.hourly}>
//             <h3>{date}</h3>
//             <div className={styles.hourly}>
//               {hourlyForecast.map((hourlyData) => (
//                 <div key={hourlyData.dt_txt} className={styles.hourlyItem}>
//                   <div>Time: {new Date(hourlyData.dt_txt).toLocaleTimeString()}</div>
//                   <div>Temperature: {hourlyData.main.temp}°{unit === 'metric' ? 'C' : 'F'}</div>
//                   <div>Description: {hourlyData.weather[0].description}</div>
//                   <div>
//                     <img src={`http://openweathermap.org/img/wn/${hourlyData.weather[0].icon}.png`} alt="weather icon" />
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default CurrentWeather;



import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './CurrentWeather.module.css';

interface Props {
  unit: string;
}

interface WeatherData {
  list: {
    main: {
      temp: number;
    };
    weather: {
      description: string;
      icon: string;
    }[];
    dt_txt: string;
  }[];
  city: {
    name: string;
  };
}

const CurrentWeather: React.FC<Props> = ({ unit }) => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      const apiKey = 'b76f63924fc1227699172657e127c060';
      const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=${unit}&appid=${apiKey}`;

      axios.get(apiUrl)
        .then(response => {
          setWeatherData(response.data);
        })
        .catch(error => {
          console.error('Error fetching weather data:', error);
        });
    });
  }, [unit]);

  if (!weatherData) {
    return <div>Loading...</div>;
  }

  const hourlyData = weatherData.list.filter((data) => {
    const dt = new Date(data.dt_txt);
    const currentDt = new Date();
    return dt >= currentDt && dt.getHours() < currentDt.getHours() + 24;
  });

  const groupedHourlyData: { [key: string]: WeatherData['list'] } = {};
  hourlyData.forEach((data) => {
    const date = new Date(data.dt_txt).toLocaleDateString();
    if (!groupedHourlyData[date]) {
      groupedHourlyData[date] = [];
    }
    groupedHourlyData[date].push(data);
  });

  return (
    <div className={styles.container}>
      <div className={styles.current}>
        <h2>Current Weather in your location</h2>
        <div>Temperature: {weatherData.list[0].main.temp}°{unit === 'metric' ? 'C' : 'F'}</div>
        <div>Description: {weatherData.list[0].weather[0].description}</div>
        <div>Place: {weatherData.city.name}</div>
        <div>
          <img src={`http://openweathermap.org/img/wn/${weatherData.list[0].weather[0].icon}.png`} alt="weather icon" />
        </div>
      </div>
      <div className={styles.hourlyForecast}>
        <h2>Hourly Forecast</h2>
        {Object.entries(groupedHourlyData).map(([date, hourlyForecast]) => (
          <div key={date} className={styles.hourly}>
            <h3>{date}</h3>
            <div className={styles.hourly}>
              {hourlyForecast.map((hourlyData) => (
                <div key={hourlyData.dt_txt} className={styles.hourlyItem}>
                  <div>Time: {new Date(hourlyData.dt_txt).toLocaleTimeString()}</div>
                  <div>Temperature: {hourlyData.main.temp}°{unit === 'metric' ? 'C' : 'F'}</div>
                  <div>Description: {hourlyData.weather[0].description}</div>
                  <div>
                    <img src={`http://openweathermap.org/img/wn/${hourlyData.weather[0].icon}.png`} alt="weather icon" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CurrentWeather;

