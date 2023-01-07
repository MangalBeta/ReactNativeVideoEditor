import axios from 'axios';
import { ENV } from './enviroments';
export default class WebService {
  static webService = null;
  static isJwtTokenExist = false;
  static REQUEST_HEADERS = null;
  static REQUEST_HEADERS = {};
  static getInstance(
    isValidKey,
    jwtToken,
  ) {
    this.REQUEST_HEADERS = {
      BASE_URL: ENV('API_BASE_URL'),
      CONTENT_TYPE: 'Content-Type',
    };

    // if (isNull(WebService.webService) || !WebService.isJwtTokenExist ) {
    if (jwtToken && jwtToken != 'null') {
      this.isJwtTokenExist = true;
    }

    let headerPayload = {
      Accept: 'application/json',
    };
    if (jwtToken && jwtToken != 'null') {
      headerPayload = { ...headerPayload, 'jwt-token': jwtToken };
    }
  

 

    if (__DEV__) {
      console.log('[LOG][API]-WebService headerPayload ', headerPayload);
    }    
    this.webService = axios.create({
      baseURL: this.REQUEST_HEADERS.BASE_URL,
      headers: headerPayload,
    });

    this.webService.interceptors.request.use(
      config => {
        return { ...config, RequestTime: new Date().toISOString() };
      },
      error => Promise.reject(error),
    );

    this.webService.interceptors.response.use(
      response => {
        return response;
      },
      error => {
        return Promise.reject(error);
      },
    );
    return this.webService;
  }
}
