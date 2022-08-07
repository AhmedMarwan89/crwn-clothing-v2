import {useState} from 'react'
import FormInput from '../form-input/form-input.component'
import {signInWithGooglePopup ,SignInAuthUserWithEmailAndPassword, createUserDocumentFromAuth} from'../../utils/firebase/firebase.utils'
import './sign-in-form.styles.scss'
import Button from'../button/button.component'
const defaultFormFields={
    email:"",
    password:""}

const SignInForm = ()=>{
    const [formFields,setFormFields]=useState(defaultFormFields)
    const {  email , password }=formFields
    const handleChange=(event)=>{
        const {name , value}=event.target
        setFormFields({...formFields , [name]:value})
    }

    const resetFormFields=()=>{
        setFormFields(defaultFormFields)
    }

    const SignInWithGoogle = async ()=>{
        const {user} = await signInWithGooglePopup()        
        await createUserDocumentFromAuth(user)
    
    }


    const handleSubmit=async(event)=>{
        event.preventDefault()
        
        //prevent the form of bahave as default things to do 
       
        try{
            const response = await SignInAuthUserWithEmailAndPassword(email,password)
            console.log(response)
        resetFormFields()
        //it expected dictionary so I should pass a dictionary 
    }
        
        catch(error){
        switch(error.code){
            case "auth/wrong-password":
                alert("incorrect password for email");
                break;

            case "auth/user-not-found":
                alert('no user associated with this email')
                break ;
            default :
            console.log(error)

        }
       
       

        }
        

    }


    return (
        <div className="sign-up-container">
            <h2>already have an account ?</h2>
            <span>sign in with your email and password</span>
            <form onSubmit={handleSubmit} style={{fontSize:"50px"}}>                
                <FormInput label = "Email"  style={{fontSize:"50px"}} required name='email' onChange={handleChange} value={email} type="email"/>               
                <FormInput label = "Password" style={{fontSize:"50px"}}  required name='password' onChange={handleChange} value={password} type="password"/>                
                <div className='buttons-container'> 
                <Button buttonType="default" type='submit'> sign In</Button>
                <Button buttonType="google"type="button"  onClick={SignInWithGoogle}> google sign In</Button>
                </div>
            </form>
        </div>
    )

}

export default SignInForm