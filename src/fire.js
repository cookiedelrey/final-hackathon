import firebase from 'firebase/compat/app';
import 'firebase/compat/app';
import 'firebase/compat/auth';

import { initializeApp } from 'firebase/app';
import { getFirestore } from '@firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyB1b2JcrxUURtQCVKJ34P8Cb62RN5vcSHU',
  authDomain: 'test-51d38.firebaseapp.com',
  projectId: 'test-51d38',
  storageBucket: 'test-51d38.appspot.com',
  messagingSenderId: '1072517960645',
  appId: '1:1072517960645:web:f7ec002221814ada7cb1ac',
};

// Initialize Firebase
const fire = firebase.initializeApp(firebaseConfig);
export default fire;

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
