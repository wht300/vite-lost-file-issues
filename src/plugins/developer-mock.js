import * as mockUtils from '@/utils/dev-utils';

export default function developerMock() {
  if (import.meta.env.MODE === 'development') {
    // 当dev环境中mock token
    mockUtils.mockToken();
    mockUtils.mockAppFun();
  }
}
