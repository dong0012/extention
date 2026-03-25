console.log('ZenTab Service Worker Initialized');

chrome.runtime.onInstalled.addListener(() => {
  console.log('ZenTab Extension Installed');
});
