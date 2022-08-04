import {useState} from 'react'
import FormInput from '../form-input/form-input.component'
import {createAuthUserWithEmailAndPassword , createUserDocumentFromAuth} from'../../utils/firebase/firebase.utils'
import './sign-up-form.style.scss'
import Button from'../button/button.component'
const defaultFormFields={
    displayName:"",
    email:"",
    password:"",
    confirmPassword:""
}

const SignUpForm = ()=>{
    const [formFields,setFormFields]=useState(defaultFormFields)
    const {displayName , email , password, confirmPassword}=formFields
    const handleChange=(event)=>{
        const {name , value}=event.target
        setFormFields({...formFields , [name]:value})
    }

    const resetFormFields=()=>{
        setFormFields(defaultFormFields)
    }

    const handleSubmit=async(event)=>{
        event.preventDefault()
        
        //prevent the form of bahave as default things to do 
        if(password!== confirmPassword) {
            alert("passwords don't match")
            return }
        try{
        const {user} = await createAuthUserWithEmailAndPassword( email , password)
         await createUserDocumentFromAuth(user , {displayName}) 
         resetFormFields()
        //it expected dictionary so I should pass a dictionary 
    }
        
        catch(error){
            if(error.code=='auth/email-already-in-use'){
                alert("the email is already in use ")
            }else {
                console.log("error in creating the user using email and password" +error)

            }

        }
        

    }


    return (
        <div className="sign-up-container">
            <h2>Don't have an account ?</h2>
            <span>sign up with your email and password</span>
            <form onSubmit={handleSubmit} style={{fontSize:"50px"}}>                
                <FormInput type = "text" label = "Display Name" style={{fontSize:"50px"}} required  name='displayName' onChange={handleChange}  value={displayName}/>                                
                <FormInput label = "Email"  style={{fontSize:"50px"}} required name='email' onChange={handleChange} value={email} type="email"/>               
                <FormInput label = "Password" style={{fontSize:"50px"}}  required name='password' onChange={handleChange} value={password} type="password"/>                
                <FormInput  label = "Confirm Password" style={{fontSize:"50px"}} required name='confirmPassword' onChange={handleChange} value={confirmPassword}/>
                <Button buttonType="default" type='submit'> signup</Button>
            </form>
        </div>
    )

}

export default SignUpForm