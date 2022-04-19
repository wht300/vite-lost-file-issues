import { defineStore } from 'pinia';
import { reactive, ref, toRefs, unref } from 'vue-demi';
import useAjax from '@/hooks/modules/useAjax.js';

export const useUserInfoStore = defineStore('userInfoStore', () => {
  // 是否请求成功
  const isFinish = ref(false);
  const userInfo = reactive({
    roleNo: '', // 当前选择角色编号
    roleNoList: [],
    contact: '', // 真实姓名
    mobile: '', // 手机号
    serviceStationChannel: [], // 服务站渠道编号列表
    serviceStationID: '', // 服务站ID
  });
  const { run } = useAjax(async () => {}, { manual: true });
  const setRoleNo = (roleNo) => {
    userInfo.roleNo = roleNo;
  };
  // 获取用户信息
  const getUserInfo = async () => {
    if (unref(isFinish)) return userInfo;
    const res = await run();
    isFinish.value = true;
    const dataValue = res.data;
    const {
      contact,
      mobile,
      rolesTList,
      serviceStationChannel,
      serviceStationID,
    } = dataValue;
    Object.assign(userInfo, {
      rolesTList: rolesTList,
      serviceStationChannel: serviceStationChannel
        ? serviceStationChannel.split(',')
        : [],
    });
    return userInfo;
  };
  return {
    ...toRefs(userInfo),
    isFinish,
    setRoleNo,
    getUserInfo,
  };
});
