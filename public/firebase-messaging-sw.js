// Scripts for firebase and firebase messaging
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing the generated config
var firebaseConfig = {
    apiKey: "AIzaSyB4Rew6VfT94NhjCCY4TgATu9lcSKuDp48",
    authDomain: "test-ddac5.firebaseapp.com",
    projectId: "test-ddac5",
    storageBucket: "test-ddac5.appspot.com",
    messagingSenderId: "107081019969",
    appId: "1:107081019969:web:02ba90b203f36dacfc8cc0",
    measurementId: "G-F9VS4W64W8"
  };
  
  firebase.initializeApp(firebaseConfig);
  
  // Retrieve firebase messaging
  const messaging = firebase.messaging();
  
  messaging.onBackgroundMessage(function(payload) {
    console.log('Received background message ', payload);
  
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
      body: payload.notification.body,
    };
  
    self.registration.showNotification(notificationTitle,
      notificationOptions);
  });