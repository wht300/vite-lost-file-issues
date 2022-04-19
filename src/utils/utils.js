import { unref } from 'vue-demi';
import Compressor from 'compressorjs';
import dayjs from 'dayjs';
import numeral from 'numeral';

// 判断是否为空内容
export const isEmpty = (list) => {
  const paramType = typeof list;
  const notEmptyTypes = ['number', 'boolean', 'function'];
  const emptyTypes = ['undefined'];
  if (notEmptyTypes.includes(paramType)) return false;
  if (emptyTypes.includes(paramType)) return true;
  if (list === null) return true;
  const data = unref(list);
  return data.length === 0;
};
export const isAndroid = () =>
  navigator.userAgent.indexOf('Android') > -1 ||
  navigator.userAgent.indexOf('Adr') > -1;
export const isIOS = () =>
  !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);

export const isObject = (object) => {
  return Object.prototype.toString.call(object) === '[object Object]';
};
export const hasProperty = (target, propertyName) => {
  return Object.prototype.hasOwnProperty.call(target, propertyName);
};
// 判断AJAX请求是否成功
export const isAjaxSuccess = (res) => {};

export { default as cacheAjax } from './utils-moudles/cacheAjax';

/**
 * 压缩图片
 * @param {file} file - 输入图片
 * @param {number} targetSize - 期望文件尺寸
 * @returns {Promise} resolved promise - 返回压缩后的新图片
 */
export async function compressImage(file, targetSize = 1024 * 1024) {
  return new Promise((resolve, reject) => {
    // 导出新图片
    // 指定图片 MIME 类型为 'image/jpeg', 通过 quality 控制导出的图片质量，进行实现图片的压缩
    const fileSize = file.size;
    const defaultQuality = 0.98;
    const quality =
      fileSize <= targetSize ? defaultQuality : targetSize / fileSize;
    new Compressor(file, {
      quality: quality,

      success(result) {
        resolve(result);
      },
      error(err) {
        reject(err);
      },
    });
  });
}

// 获取当前时间
export function getNowTime() {
  return dayjs().format('YYYY-MM-DD HH:mm:ss');
}

// 获取当前时间
export function dateTimeFormatter(type, val) {
  if (type === 'year') {
    return `${val}年`;
  } else if (type === 'month') {
    return `${val}月`;
  } else if (type === 'day') {
    return `${val}日`;
  } else if (type === 'hour') {
    return `${val}时`;
  } else if (type === 'minute') {
    return `${val}分`;
  }
  return val;
}
// 判断文件是否来自于相册
export function imgIsFormPhoto(file) {
  const { lastModified, name } = file;
  const currentTime = new Date().getTime();
  // 判断图片是否当前拍摄阈值
  const threshold = 1000;
  // 判断文件时间早于当前时间1s为从相册中获取的内容
  if (currentTime - lastModified > threshold) return true;
  // ios设备拍照时文件名称为image.jpg
  if (name === 'image.jpg') return false;
  return false;
}

export function dateFilter(time) {
  const YMDFormat = 'YYYY-MM-DD';
  const HMFormat = 'HH:mm';
  const dataDict = {
    [dayjs().format(YMDFormat)]: '今天',
    [dayjs().add(1, 'day').format(YMDFormat)]: '明天',
    [dayjs().add(2, 'day').format(YMDFormat)]: '后天',
  };
  const timeYMD = dayjs(time).format(YMDFormat);
  const timeHM = dayjs(time).format(HMFormat);
  return dataDict[timeYMD]
    ? `${dataDict[timeYMD]} ${timeHM}`
    : `${timeYMD} ${timeHM}`;
}
export function numberFilter(num, tausendstel = false, decimalDigits = 2) {
  const decimalDigitsNum = decimalDigits
    ? `.${new Array(Number(decimalDigits)).fill(0).join('')}`
    : '';
  return numeral(Number(num)).format(
    `${tausendstel ? '0,' : ''}0${decimalDigitsNum}`
  );
}
export function numberDisplay(value, decimalDigits, tausendstel = false) {
  const _decimalDigits = decimalDigits
    ? `.${new Array(Number(decimalDigits)).fill(0).join('')}`
    : '';
  return numeral(Number(value)).format(
    `${tausendstel ? '0,' : ''}0${_decimalDigits}`
  );
}
