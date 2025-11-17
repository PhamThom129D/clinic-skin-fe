const loadingBus = {
  start() {
    window.dispatchEvent(new Event("globalLoadingStart"));
  },
  stop() {
    window.dispatchEvent(new Event("globalLoadingStop"));
  },
};

export default loadingBus;
