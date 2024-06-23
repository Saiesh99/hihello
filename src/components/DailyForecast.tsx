// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// interface Props {
//   unit: string;
// }

// interface DailyData {
//   dt: number;
//   main: {
//     temp_min: number;
//     temp_max: number;
//   };
//   weather: {
//     description: string;
//     icon: string;
//   }[];
// }

// const DailyForecast: React.FC<Props> = ({ unit }) => {
//   const [dailyData, setDailyData] = useState<DailyData[]>([]);

//   useEffect(() => {
//     navigator.geolocation.getCurrentPosition((position) => {
//       const { latitude, longitude } = position.coords;
//       const apiKey = 'b76f63924fc1227699172657e127c060';
//       const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=${unit}&appid=${apiKey}`;

//       axios.get(apiUrl)
//         .then(response => {
//           // Group data by day
//           const groupedData = response.data.list.reduce((acc: any, curr: any) => {
//             const date = new Date(curr.dt * 1000).toLocaleDateString();
//             if (!acc[date]) {
//               acc[date] = [];
//             }
//             acc[date].push(curr);
//             return acc;
//           }, {});

//           // Get daily high and low temperatures
//           const dailyData = Object.values(groupedData).map((day: any) => {
//             const temps = day.map((hour: any) => hour.main.temp);
//             const temp_min = Math.min(...temps);
//             const temp_max = Math.max(...temps);
//             return {
//               dt: day[0].dt,
//               main: {
//                 temp_min,
//                 temp_max
//               },
//               weather: day[0].weather
//             };
//           });

//           setDailyData(dailyData.slice(0, 5)); // Get first 5 days
//         })
//         .catch(error => {
//           console.error('Error fetching daily data:', error);
//         });
//     });
//   }, [unit]);

//   return (
//     <div>
//       {dailyData.map((day) => (
//         <div key={day.dt}>
//           <div>Date: {new Date(day.dt * 1000).toLocaleDateString()}</div>
//           <div>High: {day.main.temp_max}°{unit === 'metric' ? 'C' : 'F'}</div>
//           <div>Low: {day.main.temp_min}°{unit === 'metric' ? 'C' : 'F'}</div>
//           <div>Description: {day.weather[0].description}</div>
//           <div>
//             <img src={`http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`} alt="weather icon" />
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default DailyForecast;

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import styles from './DailyForecast.module.css';

// const API_KEY = 'b76f63924fc1227699172657e127c060'; // Replace with your OpenWeatherMap API key

// interface Props {
//   unit: string;
// }

// const DailyForecast: React.FC<Props> = ({ unit }) => {
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
//           <h2>5-Day Forecast</h2>
//           {forecastData.list
//             .filter((item: any) => new Date(item.dt * 1000).getHours() === 12)
//             .map((item: any, index: number) => (
//               <div key={index} className={styles.forecastInfo}>
//                 <p>Date: {new Date(item.dt * 1000).toLocaleDateString()}</p>
//                 <p>Temperature: {item.main.temp}°C</p>
//                 <p>Weather: {item.weather[0].description}</p>
//               </div>
//             ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default DailyForecast;


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './DailyForecast.module.css';

interface Props {
  unit: string;
}

interface DailyData {
  dt: number;
  main: {
    temp_min: number;
    temp_max: number;
  };
  weather: {
    description: string;
    icon: string;
  }[];
}

const DailyForecast: React.FC<Props> = ({ unit }) => {
  const [dailyData, setDailyData] = useState<DailyData[]>([]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      const apiKey = 'b76f63924fc1227699172657e127c060';
      const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=${unit}&appid=${apiKey}`;

      axios.get(apiUrl)
        .then(response => {
          // Group data by day
          const groupedData = response.data.list.reduce((acc: any, curr: any) => {
            const date = new Date(curr.dt * 1000).toLocaleDateString();
            if (!acc[date]) {
              acc[date] = [];
            }
            acc[date].push(curr);
            return acc;
          }, {});

          // Get daily high and low temperatures
          const dailyData = Object.values(groupedData).map((day: any) => {
            const temps = day.map((hour: any) => hour.main.temp);
            const temp_min = Math.min(...temps);
            const temp_max = Math.max(...temps);
            return {
              dt: day[0].dt,
              main: {
                temp_min,
                temp_max
              },
              weather: day[0].weather
            };
          });

          setDailyData(dailyData.slice(0, 5)); // Get first 5 days
        })
        .catch(error => {
          console.error('Error fetching daily data:', error);
        });
    });
  }, [unit]);

  return (
    <div className={styles.container}>
      <h2>Daily Forecast</h2>
      {dailyData.map((day) => (
        <div key={day.dt} className={styles.day}>
          <div>Date: {new Date(day.dt * 1000).toLocaleDateString()}</div>
          <div>High: {day.main.temp_max}°{unit === 'metric' ? 'C' : 'F'}</div>
          <div>Low: {day.main.temp_min}°{unit === 'metric' ? 'C' : 'F'}</div>
          <div>Description: {day.weather[0].description}</div>
          <div>
            <img src={`http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`} alt="weather icon" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default DailyForecast;




// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import styles from './DailyForecast.module.css';

// interface Props {
//   unit: string;
// }

// interface DailyData {
//   dt: number;
//   main: {
//     temp_min: number;
//     temp_max: number;
//   };
//   weather: {
//     description: string;
//     icon: string;
//   }[];
// }

// const DailyForecast: React.FC<Props> = ({ unit }) => {
//   const [dailyData, setDailyData] = useState<DailyData[]>([]);
//   const [unit1, setUnit] = useState<string>('metric');

//   useEffect(() => {
//     navigator.geolocation.getCurrentPosition((position) => {
//       const { latitude, longitude } = position.coords;
//       const apiKey = 'b76f63924fc1227699172657e127c060';
//       const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=${unit}&appid=${apiKey}`;

//       axios.get(apiUrl)
//         .then(response => {
//           // Group data by day
//           const groupedData = response.data.list.reduce((acc: any, curr: any) => {
//             const date = new Date(curr.dt * 1000).toLocaleDateString();
//             if (!acc[date]) {
//               acc[date] = [];
//             }
//             acc[date].push(curr);
//             return acc;
//           }, {});

//           // Get daily high and low temperatures
//           const dailyData = Object.values(groupedData).map((day: any) => {
//             const temps = day.map((hour: any) => hour.main.temp);
//             const temp_min = Math.min(...temps);
//             const temp_max = Math.max(...temps);
//             return {
//               dt: day[0].dt,
//               main: {
//                 temp_min,
//                 temp_max
//               },
//               weather: day[0].weather
//             };
//           });

//           setDailyData(dailyData.slice(0, 5)); // Get first 5 days
//         })
//         .catch(error => {
//           console.error('Error fetching daily data:', error);
//         });
//     });
//   }, [unit]);

//   const toggleUnit = () => {
//     setUnit(unit1 === 'metric' ? 'imperial' : 'metric');
//     const updatedData = dailyData.map((day) => {
//       return {
//         ...day,
//         main: {
//           ...day.main,
//           temp_min: unit === 'metric' ? (day.main.temp_min * 9) / 5 + 32 : ((day.main.temp_min - 32) * 5) / 9,
//           temp_max: unit === 'metric' ? (day.main.temp_max * 9) / 5 + 32 : ((day.main.temp_max - 32) * 5) / 9
//         }
//       };
//     });
//     setDailyData(updatedData);
//   };

//   return (
//     <div className={styles.container}>
//       <h2>Daily Forecast</h2>
//       <button onClick={toggleUnit} className={styles.toggleButton}>
//         Toggle Unit ({unit === 'metric' ? '°C' : '°F'})
//       </button>
//       {dailyData.map((day) => (
//         <div key={day.dt} className={styles.day}>
//           <div>Date: {new Date(day.dt * 1000).toLocaleDateString()}</div>
//           <div>High: {day.main.temp_max.toFixed(2)}°{unit === 'metric' ? 'C' : 'F'}</div>
//           <div>Low: {day.main.temp_min.toFixed(2)}°{unit === 'metric' ? 'C' : 'F'}</div>
//           <div>Description: {day.weather[0].description}</div>
//           <div>
//             <img src={`http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
//                  alt="weather icon"/>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default DailyForecast;
