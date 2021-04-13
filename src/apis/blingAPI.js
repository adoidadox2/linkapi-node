import axios from 'axios';

const blingAPI = axios.create({
  baseURL: process.env.BLING_URL,
});

export default blingAPI;
