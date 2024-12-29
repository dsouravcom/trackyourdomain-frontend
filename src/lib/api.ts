import { useAuth } from '@clerk/nextjs';
import axios from 'axios';

const url = process.env.NEXT_PUBLIC_API_URL;
// Custom hook that returns an authenticated API instance
export function useAuthApi() {
  const { getToken } = useAuth();
  
  const api = axios.create({
    baseURL: `${url}/api`,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // Add auth token to requests
  api.interceptors.request.use(async (config) => {
    const token = await getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  return api;
}