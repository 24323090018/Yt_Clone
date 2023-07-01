import firebase from 'firebase/compat/app'

import 'firebase/compat/auth'

const firebaseConfig = {
    apiKey: "AIzaSyBRedfGQ8m2WB5HMT0u7JM2P766M6zSVhM",
    authDomain: "clone-a18ad.firebaseapp.com",
    projectId: "clone-a18ad",
    storageBucket: "clone-a18ad.appspot.com",
    messagingSenderId: "558438361150",
    appId: "1:558438361150:web:8138587d359f8a8eb7096f"
  };

  firebase.initializeApp(firebaseConfig)

  export default firebase.auth()