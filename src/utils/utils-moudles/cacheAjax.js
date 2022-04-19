/**
 * 缓存Ajax
 * */
const cache = new Map();
const DefaultParamsKey = 'default';

export const hasCache = (sendFunc, params) => {
  if (!cache.has(sendFunc)) return false;
  const sendFuncCache = cache.get(sendFunc);
  return sendFuncCache.has(params ? JSON.stringify(params) : DefaultParamsKey);
};
export const getCache = (sendFunc, params) => {
  const sendFuncCache = cache.get(sendFunc);
  if (params) return sendFuncCache.get(JSON.stringify(params));
  return sendFuncCache.get(DefaultParamsKey);
};
export const setCache = (sendFunc, params, res) => {
  const paramsKey = params ? JSON.stringify(params) : DefaultParamsKey;
  const paramsCatch = cache.has(sendFunc) ? cache.get(sendFunc) : new Map();
  paramsCatch.set(paramsKey, res);
  cache.set(sendFunc, paramsCatch);
  return res;
};

export const cacheClear = cache.clear;
export const cacheDelete = cache.delete;
export const cacheAjax = (sendFunc, ...params) => {
  if (hasCache(sendFunc, params)) {
    return Promise.resolve(getCache(sendFunc, params));
  }
  return sendFunc(...params).then((res) => {
    return setCache(sendFunc, params, res);
  });
};
cacheAjax.prototype = {
  ...cacheAjax.prototype,
  hasCache: hasCache,
  getCache: getCache,
  setCache: setCache,
  clear: cache.clear,
  delete: cache.delete,
};
export default cacheAjax;
