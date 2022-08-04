import {signInWithGooglePopup, createUserDocumentFromAuth , signInWithGoogleRedirect  } from'../../utils/firebase/firebase.utils'
import SignUpForm from '../../components/sign-up-form/sign-up-form.componenet'
const SignIn =()=>{

   
    const logGoogleUser = async ()=>{
        const {user} = await signInWithGooglePopup()        
    const response = await createUserDocumentFromAuth(user)
    console.log(response)
    }


   
    return(
        <div>
            <h1>Sign In</h1>
            <button onClick={logGoogleUser} style={{fontSize:"50px"}}>
                sign in with google
                </button> 
                <br/>
                <SignUpForm/>
            
        </div>
    )
}
export default SignIn