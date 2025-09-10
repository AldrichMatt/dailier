export function registerServiceWorker() {
  if ("serviceWorker" in navigator) {
    return navigator.serviceWorker.register("/sw.js")
      .then(reg => {
        console.log("Service Worker registered:", reg);
        return reg;
      });
  }
}