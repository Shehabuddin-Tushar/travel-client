import { initializeApp } from "firebase/app";

import firebaseConfig from "./firebase.config";

const travelAuthantication=()=>{
   
    initializeApp(firebaseConfig)
}

export default travelAuthantication;