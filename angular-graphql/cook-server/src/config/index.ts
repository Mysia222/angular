import firebase from 'firebase/app';

const config = {
  apiKey: 'AIzaSyBTe5IC3O5U5Z93gyKk4Gd7MVOdrfdU1Ao',
  authDomain: 'nucleus-wallet.firebaseapp.com',
  databaseURL: 'https://nucleus-wallet.firebaseio.com',
  projectId: 'nucleus-wallet',
  storageBucket: 'nucleus-wallet.appspot.com',
  messagingSenderId: '290607547429'
};

firebase.initializeApp(config);