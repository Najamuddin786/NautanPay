// api.js or config.js (whichever file handles API URLs)

const BASE_URL = import.meta.env.MODE === 'development'
  ? 'http://localhost:3000'
  : 'https://nautanpay.onrender.com';

export default BASE_URL;



// import axios from 'axios';
// import BASE_URL from './config';

// export const fetchData = async () => {
//   try {
//     const response = await axios.get(`${BASE_URL}/your-endpoint`);
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching data:", error);
//   }
// };
