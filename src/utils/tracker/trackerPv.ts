import tracker from './tracker';
export function pv() {
  tracker.send({
    kind: 'business',
    type: 'pv',
    startTime: performance.now(),
    pageURL: getPageURL(),
    referrer: document.referrer,
    uuid: getUUID(),
  });
  const startTime = Date.now();
  window.addEventListener(
    'beforeunload',
    () => {
      const stayTime = Date.now() - startTime;
      tracker.send({
        kind: 'business',
        type: 'stayTime',
        stayTime,
        pageURL: getPageURL(),
        uuid: getUUID(),
      });
    },
    false
  );
}
function getPageURL() {
  return 'url';
}
function getUUID() {
  return 'uuid';
}
function getLines(times) {
  return times;
}
function onload(cb) {
  window.onload = cb;
}
