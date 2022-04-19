import { Toast } from 'vant';
import { ref, unref, watch } from 'vue-demi';
import { cacheAjax, isAjaxSuccess } from '@/utils/utils';
import {
  showFullScreenLoading,
  tryHideFullScreenLoading,
} from '@/utils/global-loading.js';

Toast.allowMultiple();
const defaultOptions = {
  showLoading: true,
  defaultDataType: null,
  cache: false,
  manual: false,
  loadingText: '加载中...',
  // 取消之前请求
  blockRepeatedRequests: false,
};

/**
 * @typedef {Object} UseAjaxRes
 * @property {ref<Object|Array>} data 请求信息
 * @property {ref<Boolean>} loading 是否正在请求
 * @property {ref<Error>} error 错误信息
 * @property {ref<Boolean>} hasError 是否有错误信息
 * @property {ref<Promise>} ajaxPromise 请求实例
 * @property {function(*):Promise} run 请求实例
 */
/**
 * @typedef {Object} Options
 * @property {any} params - 请求参数
 * @property {Boolean} [showLoading=true] - 是否显示弹出框
 * @property {Boolean} [loadingText="加载中..."] - 加载文本
 * @property {Array|Object} [defaultDataType=null] - 默认弹出类型
 * @property {Boolean} [cache=false] - 缓存请求
 * @property {Boolean} [manual=false] - 手动
 * @property {Boolean} [blockRepeatedRequests=false] - 阻止重复请求
 */
/**
 * 将ajax转为响应式返回函数
 * @param {function(*): Promise} ajaxFun - 请求函数
 * @param {Object} options - 配置
 * @param {any} options.params - 请求参数
 * @param {Boolean} [options.showLoading=true] - 是否显示弹出框
 * @param {Boolean} [options.loadingText="加载中..."] - 加载文本
 * @param {Array|Object} [options.defaultDataType=null] - 默认弹出类型
 * @param {Boolean} [options.cache=false] - 缓存请求
 * @param {Boolean} [options.manual=false] - 手动
 * @returns {UseAjaxRes} res - 返回信息
 * */
export default function (ajaxFun, options = defaultOptions) {
  // 参数
  const {
    params,
    showLoading,
    defaultDataType,
    cache,
    manual,
    blockRepeatedRequests,
  } = {
    ...defaultOptions,
    ...options,
  };

  const loading = ref(false);
  const ajaxPromise = ref(null);
  const data = ref(null);
  const error = ref(null);
  const hasError = ref(false);
  const sendAjax = (...arg) => {
    loading.value = true;
    if (showLoading) {
      showFullScreenLoading();
    }
    ajaxPromise.value = cache ? cacheAjax(ajaxFun, ...arg) : ajaxFun(...arg);
    return unref(ajaxPromise)
      .then((res) => {
        if (!isAjaxSuccess(res)) {
          error.value = new Error(res.data.msg);
          hasError.value = true;
          data.value = [];
        } else {
          error.value = null;
          hasError.value = false;
        }
        data.value = res?.data?.data;
        return res;
      })
      .catch((err) => {
        error.value = err;
        hasError.value = true;
        data.value = [];
        return Promise.reject(err);
      })
      .finally(() => {
        loading.value = false;
        if (showLoading) {
          tryHideFullScreenLoading();
        }
      });
  };

  data.value =
    typeof defaultDataType === 'function'
      ? new defaultDataType()
      : defaultDataType;
  if (!manual) {
    sendAjax(params);
    watch(() => params, sendAjax);
  }
  return {
    data,
    loading,
    error,
    hasError,
    ajaxPromise,
    run(...arg) {
      if (loading.value === true && blockRepeatedRequests) return false;
      if (arg.length) return sendAjax(...arg);
      return params ? sendAjax(params) : sendAjax();
    },
  };
}
