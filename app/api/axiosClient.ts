import axios from 'axios';
import queryString from 'query-string';

import apiConfig from './apiConfig';
import { useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';


const axiosClient = axios.create({
  baseURL: apiConfig.baseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
  paramsSerializer: params => queryString.stringify({ ...params, api_key: apiConfig.apiKey }),
});

axiosClient.interceptors.request.use(async (config) => {
  const access = await AsyncStorage.getItem('access');
  
  if (access) {
    config.headers['Authorization'] = `Bearer ${access}`;
  }

  if (config.data instanceof FormData) {
    config.headers['Content-Type'] = 'multipart/form-data';
  }
  
  return config;
});

axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }
    return response;
  },
  async (error) => {

    if (error.response) {
      if (error.response.status === 401) {
        console.log('Handling error 401');
        
        const dispatch = useDispatch();
        const username =await  AsyncStorage.getItem('account');
        //@ts-ignore
        // dispatch(AuthActionCreators.login(username && username.email, username.password));
      } else {
        throw error;
      }
    } else {
      throw error;
    }
  }
);

export default axiosClient;
