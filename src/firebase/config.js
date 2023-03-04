
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDiuvdOib2sV_AnGkXMqCpHoWAYz2SJWro",
  authDomain: "andenecommerce.firebaseapp.com",
  projectId: "andenecommerce",
  storageBucket: "andenecommerce.appspot.com",
  messagingSenderId: "818880471445",
  appId: "1:818880471445:web:56b4348726a8d314fdd69c"
};


const app = initializeApp(firebaseConfig);

 export const initFirestore = () => {
    return app
}