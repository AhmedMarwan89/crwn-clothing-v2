import {initializeApp} from "firebase/app"
import {getAuth , signInWithPopup , GoogleAuthProvider,createUserWithEmailAndPassword , signInWithEmailAndPassword} from 'firebase/auth'
import { getFirestore , doc , getDoc,setDoc} from'firebase/firestore'
//getdoc and setdoc is dealing with document data 

const firebaseConfig = {
  apiKey: "AIzaSyDXWrTWnAluuwA7LzmI9fq-JAquvZLIJuM",
  // firebase key is not secrete
  authDomain: "crwn-clothing-db-e7c71.firebaseapp.com",
  projectId: "crwn-clothing-db-e7c71",
  storageBucket: "crwn-clothing-db-e7c71.appspot.com",
  messagingSenderId: "750871425334",
  appId: "1:750871425334:web:d3e2e82133e075f21c4397"
};

const firebaseApp=initializeApp(firebaseConfig)
const googleProvider=new GoogleAuthProvider()
googleProvider.setCustomParameters({
  prompt:"select_account"
})
export const auth = getAuth();
export const signInWithGooglePopup =()=> signInWithPopup(auth,googleProvider)
export const db=getFirestore()

export const createUserDocumentFromAuth =async(userAuth, additionalInformation={})=>{
  if(!userAuth) return ;
  const userDocRefrence = doc(db,'users',userAuth.uid)
  //(db ,'collection_name' , document_id)
  const userSnapshot=await getDoc(userDocRefrence)
  //usersnapshot is a document data , which is user data . got it from get Document.

  if(!userSnapshot.exists()){
    const{displayName , email}=userAuth
    const createdAt =new Date();

    //try is very important in async functions. it helped me decide when was the error
    try{
      await setDoc(userDocRefrence , {displayName , email ,createdAt  ,...additionalInformation})

    } 
    catch (error){
      console.log("there is error creating the user" ,  " " , error)
    }

    return userDocRefrence;

  }

}


export const createAuthUserWithEmailAndPassword=async(email , password)=>{
  if(!email||!password) return;
  return await createUserWithEmailAndPassword(auth , email,password)
}
//by involve this method in a function I can use it in diffrenet places and if the firestore make updates I only update this function
// it's like a sparatioin layer between back end the outside server and the front end 
export const SignInAuthUserWithEmailAndPassword=async(email , password)=>{
  if(!email||!password) return;
  return await signInWithEmailAndPassword(auth , email, password)
}