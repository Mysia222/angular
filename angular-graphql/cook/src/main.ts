import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';


platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));


  // Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAueqoql2dta1jZNk-e9FN2qYaVlnQg6eg",
  authDomain: "cook-22497.firebaseapp.com",
  projectId: "cook-22497",
  storageBucket: "cook-22497.appspot.com",
  messagingSenderId: "769049012711",
  appId: "1:769049012711:web:ee2dba16dcf805ba1af542"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);