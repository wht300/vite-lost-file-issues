import { Toast } from 'vant';
let loading = null;
let needLoadingRequestCount = 0;
function startLoading() {
  loading = Toast.loading({
    iconSize: '80px',
    overlay: true,
    forbidClick: true,
    duration: 0,
    className: 'vant-no-loading-bg',
  });
}

function endLoading() {
  loading.clear();
  loading = null;
}

export function showFullScreenLoading() {
  // 防止因100毫秒后关闭loading内再触发showFullScreenLoading导致重复触发loading问题
  if (needLoadingRequestCount === 0 && loading == null) {
    startLoading();
  }
  needLoadingRequestCount++;
}

export function tryHideFullScreenLoading() {
  if (needLoadingRequestCount <= 0) return;
  needLoadingRequestCount--;
  if (needLoadingRequestCount === 0) {
    // 最后一次关闭时延迟300ms再关闭（防止顺序多次请求造成频闪现象）
    setTimeout(() => {
      if (needLoadingRequestCount === 0) endLoading();
    }, 100);
  }
}
