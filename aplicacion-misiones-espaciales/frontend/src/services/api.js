import axios from 'axios';

export const api = axios.create({ 
  //baseURL: 'https://app-misiones-espaciales.vercel.app/api',
  baseURL: 'http://localhost:3000/api',
  withCredentials: true
 });