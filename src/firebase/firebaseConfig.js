/* 
firebase konsolu ve projemiz arasında köprü kurmak
için oluştururuz. 

firebase'i kullanma bilgilerini bize sunar. 

firebase üzerinde yapılan işlemler kurulumlar
uygulamada da yapılmalıdır.

*/


// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// yetkilendirme ve yetkilendirme aracısının importu aktif edilmesi
import {getAuth, GoogleAuthProvider} from "firebase/auth";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB591MHrOuIBftJdseCRr3NgU-5xdlAiao",
  authDomain: "chat-room-758cd.firebaseapp.com",
  projectId: "chat-room-758cd",
  storageBucket: "chat-room-758cd.appspot.com",
  messagingSenderId: "477748211373",
  appId: "1:477748211373:web:319ea40e59a100ab982024"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// yetkilendirme aktif etme
export const auth = getAuth(app);

// google ile yetkilendirme
export const provider = new GoogleAuthProvider();

/* veri tabanıyla aradaki bağlantıyı sağlar */
export const db = getFirestore(app)