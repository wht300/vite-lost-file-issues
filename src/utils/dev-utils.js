import { useUserInfoStore } from '@/stores/user-info.js';
// 本地mock token
export const mockToken = () => {
  const userInfoStore = useUserInfoStore();
  userInfoStore.setRoleNo(import.meta.env.VITE_APP_ROLE);
};
// 使程序运行pc端调试时调用app端时不报错
export const mockAppFun = () => {
  const mockAppFunNames = [
    'uploadRecordH5',
    'sendLocationRequestToApp',
    'PostToken',
    'BackToApp',
    'StopRecordVoice',
    'StartRecordVoice',
    'showGPSType',
    'call',
    'goingToRepair',
    'addDevice',
    'openBrowser',
  ];

  mockAppFunNames.forEach((funcName) => {
    const emptyFun = (params) => {
      console.log(`log-调用${funcName},params:`, params);
    };
    // Android
    window[funcName] = window[funcName] || emptyFun;
    // IOS
    window.webkit = window.webkit || { messageHandlers: {} };
    window.webkit.messageHandlers[funcName] = window.webkit.messageHandlers[
      funcName
    ] || { postMessage: emptyFun };
  });
};
