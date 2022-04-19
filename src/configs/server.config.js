const SERVER_ENV_CONFIG = {
  // STG: 'https://cma-stg.cummins.com.cn',
  DEV: {
    common: 'https://cma-dev.cummins.com.cn',
    // backend: 'http://192.168.0.239:8080/kangDaoApi',
    backend: 'https://cma-dev.cummins.com.cn/kangDaoApi',
    portal: 'https://cma-dev.cummins.com.cn',
    // dayun: 'https://cma-dev.cummins.com.cn/dayun'
  },
  STG: {
    common: 'https://cma-stg.cummins.com.cn',
    backend: 'https://cma-stg.cummins.com.cn/kangDaoApi',
    portal: 'https://cma-stg.cummins.com.cn',
    appointOrder: 'https://cma-stg.cummins.com.cn/appointOrder',
    // appointOrder: 'http://172.16.2.90:8093/appointOrder',
    // dayun: 'http://192.168.1.147:80/dayun'
  },
  // STG: 'http://192.168.0.122:8080',
  LAB: 'https://cma-lab.cummins.com.cn',
  PROD: {
    common: 'https://cma-common-prod.cummins.com.cn',
    backend: 'https://cma-backend-prod.cummins.com.cn/kangDaoApi',
    portal: 'https://cma-portal-prod.cummins.com.cn',
  },
};

let SERVER_ENV;
if (import.meta.env.PROD) {
  SERVER_ENV = JSON.parse(import.meta.env.VITE_APP_SERVER_ENV);
} else {
  // SERVER_ENV = SERVER_ENV_CONFIG.DEV; // DEV环境
  SERVER_ENV = SERVER_ENV_CONFIG.STG; // STG环境
  // SERVER_ENV = SERVER_ENV_CONFIG.LAB // LAB环境
  // SERVER_ENV = SERVER_ENV_CONFIG.PROD // PROD环境
}
export default SERVER_ENV;
