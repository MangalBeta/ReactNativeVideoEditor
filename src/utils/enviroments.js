import CONFIG from 'react-native-config';

export const ENV = key => {
     if (!__DEV__) {
       console.log = () => null;
     }
  
  const instance_name = CONFIG.INSTANCE;
  switch (instance_name) {
    case 'STAGING':
      return 'http:a//apiurl/com'
    case 'PRODUCTION':
      return 'http:a//apiurl/com'

    default:
      return 'http:a//apiurl/com'
  }
};
