import axios from 'axios';
const myServer = process.env.NEXT_PUBLIC_API_URL;

export const nextServer = axios.create({
  baseURL: myServer + '/api',
  withCredentials: true,
});
