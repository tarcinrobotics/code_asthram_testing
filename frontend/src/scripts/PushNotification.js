// pushNotifications.js

// Converts the URL-safe base64 string to a Uint8Array for push subscription
function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
      .replace(/\-/g, '+')
      .replace(/_/g, '/');
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

// Function to subscribe user to push notifications
export function subscribeUserToPush() {
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.ready.then(registration => {
    const pushConfig = {
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array('YOUR_PUBLIC_VAPID_KEY')  // Replace 'YOUR_PUBLIC_VAPID_KEY' with your actual VAPID public key
    };
    registration.pushManager.subscribe(pushConfig)
      .then(subscription => {
        console.log('Push Subscription: ', subscription);
        // Here you should send the subscription to your backend server
      })
      .catch(error => {
        console.error('Push Subscription failed: ', error);
      });
  });
} else {
  console.error("Service workers are not supported in this browser.");
}
}
