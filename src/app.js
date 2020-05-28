import 'regenerator-runtime';
import 'materialize-css/dist/js/materialize.min.js';
import 'materialize-css/dist/css/materialize.min.css';
import './css/style.css';
import './js/fonts.js';
import './js/main.js';
import './js/detail-team.js';
import './js/bookmark.js';
import './js/api.js';
import './js/db.js';

const urlBase64ToUint8Array = (base64String) => {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
      .replace(/-/g, '+')
      .replace(/_/g, '/');
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
};

if (!'serviceWorker' in navigator) {
  console.log('Browser tidak mendukung service worker!');
} else {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
        .then((reg) => {
          console.log('Registrasi Service Worker berhasil!');
          if ('PushManager' in window) {
            reg.pushManager.subscribe({
              userVisibleOnly: true,
              applicationServerKey: urlBase64ToUint8Array('BB5Na96Nbipru-JqyIz5JbJibzvsiUdgWKyZBo-51U24BGQzCe2TfXW3V_uH8HWxQm7j8MZL4w37J3xAiUJsE5s'),
            }).then((subscribe) => {
              console.log('Berhasil melakukan subscribe dengan endpoint: ', subscribe.endpoint);
              console.log('Berhasil melakukan subscribe dengan p256dh key: ', btoa(String.fromCharCode.apply(
                  null, new Uint8Array(subscribe.getKey('p256dh')))));
              console.log('Berhasil melakukan subscribe dengan auth key: ', btoa(String.fromCharCode.apply(
                  null, new Uint8Array(subscribe.getKey('auth')))));
            }).catch((e) => {
              console.error('Tidak dapat melakukan subscribe ', e.message);
            });
          }
        }).catch((e) => {
          console.error('Registrasi Service Worker gagal!');
        });
  });
}
