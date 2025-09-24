import axios from 'axios';

export const api = axios.create({ 
  baseURL: 'https://app-misiones-espaciales.vercel.app/api',
  withCredentials: true
 });