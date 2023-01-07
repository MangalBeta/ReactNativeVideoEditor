import axios from 'axios';
import {getBaseUrl, getSaveData, removeData, storeData} from './helpers';
import {API_TOKEN, LOCALSTORAGE_DATA_KEY} from '../constants/constants';
import ConfigBase from 'react-native-config';
import { getSelectedLanguage, localize } from '../constants/lang/';
import { trackPromise } from 'react-promise-tracker';

export const headers = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*'
};

const instance = axios.create();
instance.interceptors.request.use(async config => {
  debugger
      // const httpMetric = perf().newHttpMetric(config.url, config.method.toUpperCase());
      debugger
      // config.metadata = { httpMetric };
      // await httpMetric.start();
      const token = await getSaveData(LOCALSTORAGE_DATA_KEY.USER_TOKEN);
      console.log(token,"tokentoken")
      if (token) {
        config.headers['Authorization'] = token;
      }
      config.headers['Accept-Language'] = getSelectedLanguage();
      config.baseURL = config.url.includes("/apps/metadata") ? await getBaseUrl() : await getBaseUrl();
      //config.headers['API-TOKEN'] = API_TOKEN;
      return config;
    },
    error => {
      return Promise.reject(error);
    });


instance.interceptors.response.use(
    async function (response) {
      console.log(response,"responseresponseresponse")
      debugger
        // const { httpMetric } = response?.config?.metadata;
        debugger
        // httpMetric.setHttpResponseCode(response.status);
        // httpMetric.setResponseContentType(response.headers['content-type']);
        // await httpMetric.stop();
        return response;
    },
    async function (error) {
      debugger
        // const { httpMetric } = error?.config?.metadata;
        // httpMetric.setHttpResponseCode(error.response.status);
        // httpMetric.setResponseContentType(error.response.headers['content-type']);
        // await httpMetric.stop();
        if(error?.response?.status === 403) {
            // await storeData(LOCAL_STORAGE_DATA_KEY.UN_AUTORISED_ACCESS, JSON.stringify(true));
        }
        return Promise.reject(error);
    },
);
/*
 * This function return the response from remote server
 * @param {Object} config
 */
function fetchResponse(config) {
    console.log('config', config);
  return instance(config)
    .then(response => {
      const { data } = response;
      console.log('Response Data', data);
      if(response?.status === 403) {
        return { data: {}, success: false, error: {} };
      }
      return { success: true, data };

    })
    .catch(error => {
      console.log('error', error, error.response);
      if(error?.response?.status === 403) {
          return { data:error?.response?.data || {}, success: false, error: {} };
      }
      if (!error.response) {
        return { data: {}, success: false, error: { title: localize('common.error'), message: localize('common.checkInternet') } };
      }
      const { data } = error.response || {};
      return { success: false, data, error: { title: localize('tenantRegistration.unexpectedError'), message: localize('common.looksLikeUnexpectedError') } };
    });
}

// const getHeaders=async ()=> {
//     headers['API-TOKEN'] = API_TOKEN;
//     const token = await getSaveData(LOCAL_STORAGE_DATA_KEY.USER_TOKEN);
//         if (token) {
//             headers.Authorization = 'Bearer '+token;
//         }
//         return headers;
// };


export const api = async config =>
  trackPromise(fetchResponse({ ...config}));


// this method process the rest api multipart request
export const uploadApi = config =>
  trackPromise(fetchResponse({ ...config }));
