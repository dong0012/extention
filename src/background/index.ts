import browser from 'webextension-polyfill';

console.log('ZenTab Service Worker Initialized');

browser.runtime.onInstalled.addListener(() => {
  console.log('ZenTab Extension Installed');
});
