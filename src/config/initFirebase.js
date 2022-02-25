import firebase from "firebase";
import 'firebase/messaging';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyB4Rew6VfT94NhjCCY4TgATu9lcSKuDp48",
    authDomain: "test-ddac5.firebaseapp.com",
    projectId: "test-ddac5",
    storageBucket: "test-ddac5.appspot.com",
    messagingSenderId: "107081019969",
    appId: "1:107081019969:web:02ba90b203f36dacfc8cc0",
    measurementId: "G-F9VS4W64W8"
  };

firebase.initializeApp(firebaseConfig);
export const firebaseDatabase = firebase.database();
export const firebaseAuth = firebase.auth();
export const firebaseStorage = firebase.storage();
const messaging = firebase.messaging();
export const onMessageListener = () =>
  new Promise((resolve) => {
    messaging.onMessage((payload) => {
      resolve(payload);
    });
});
export const getToken = (setTokenFound) => {
  return messaging.getToken({vapidKey: 'GENERATED_MESSAGING_KEY'}).then((currentToken) => {
    if (currentToken) {
      console.log('current token for client: ', currentToken);
      setTokenFound(true);
      // Track the token -> client mapping, by sending to backend server
      // show on the UI that permission is secured
    } else {
      console.log('No registration token available. Request permission to generate one.');
      setTokenFound(false);
      // shows on the UI that permission is required 
    }
  }).catch((err) => {
    console.log('An error occurred while retrieving token. ', err);
    // catch error while creating client token
  });
}

export default firebase;
