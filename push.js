const webPush = require('web-push');

const vapidKeys = {
  'publicKey': 'BB5Na96Nbipru-JqyIz5JbJibzvsiUdgWKyZBo-51U24BGQzCe2TfXW3V_uH8HWxQm7j8MZL4w37J3xAiUJsE5s',
  'privateKey': 'NJjqtFhPWJv0F1bx7T9RXE3u3prR7AkzG7FxJ4r2tlo',
};

webPush.setVapidDetails(
    'mailto:test@domain.org',
    vapidKeys.publicKey,
    vapidKeys.privateKey,
);
const pushSubscription = {
  'endpoint': 'https://fcm.googleapis.com/fcm/send/f5mRys1COFg:APA91bGTz9OWlG4YeDCsJrgqOz97DTQrPmIT9WQ7j_4Sv_z6BTs4_XdvHXOh3h9FiCa-wziqdtwVpNaB39MTXPY98mrtO2Ts3rbvcj2Zw8u4lcsTxbGUyIwjvHigXYT1E_zLhaqh8u5e',
  'keys': {
    'p256dh': 'BDqQYRL1H0mDvMlGvm3nseXss0hIJWc9h2KlsAP0jWI+5fNsax9QxBaTtwQF1OaVxKL2oiHPpm8R5oMxvuo7vX0=',
    'auth': 'pAIVCeYUpVUtZUPyJOT1Sg==',
  },
};
const payload = 'Notifikasi dengan payload!';

const options = {
  gcmAPIKey: '13663733519',
  TTL: 60,
};
webPush.sendNotification(
    pushSubscription,
    payload,
    options,
);
