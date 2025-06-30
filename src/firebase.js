import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
} from "firebase/auth";
import {
  getFirestore,
  addDoc,
  collection
} from "firebase/firestore";
import { toast } from "react-toastify";


const firebaseConfig = {
  apiKey: "AIzaSyBjgh3Yt4RFomkQsJFBYtWBWTSiTDKQlvE",
  authDomain: "netflix-clone-d20de.firebaseapp.com",
  projectId: "netflix-clone-d20de",
  storageBucket: "netflix-clone-d20de.firebasestorage.app",
  messagingSenderId: "376712183617",
  appId: "1:376712183617:web:685e1414ed65ea4cbfebc0"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password) => {
    try{
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await addDoc(collection(db,"user"), {
            uid: user.uid,
            name,
            authProvider: 'local',
            email,
        })
    } catch(error) {
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}

const login = async (email,password) => {
    try{
        await signInWithEmailAndPassword(auth,email,password);
    } catch(error) {
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}

const logout = () => {
    signOut(auth);
}

export {auth, db, signup, login, logout}

