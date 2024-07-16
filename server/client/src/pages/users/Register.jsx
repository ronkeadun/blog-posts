import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"

import Alert from "../../components/Alert"
import { registerUser } from "../../controllers/usersController"
import { UserContext } from "../../contexts/UserContext"

const Register = () => {
  //Use User Context
  const {setUser} = useContext(UserContext)
  //Use navigate hook
  const navigate = useNavigate()
  
  //Error State
  const [error, setError] = useState(null)

  //Form data state
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    passwordConfirm: ""
  })

  //Handle Registration
  const handleRegister = async(e)=>{
    e.preventDefault()
    try {
      //Register the user
      await registerUser(
        formData.email, 
        formData.password, 
        formData.passwordConfirm
      )
      //Update the user's state
      setUser({email:formData.email, posts:[]})
      //Navigate to Dashboard
      navigate("/dashboard")
    } catch (error) {
      setError(error.message)
    }
  }
  
  return (
    <section className="card" style={{maxWidth:'960px'}}>
      <h2 className="title">Create a New Account</h2>

      <form onSubmit={handleRegister}>
        <input 
          type="email" 
          placeholder="Email Address" 
          className="input"
          value={formData.email} 
          onChange={(e)=>setFormData({...formData, email: e.target.value})}
          autoFocus
        />
        <input 
          type="password" 
          placeholder="Password" 
          className="input"
          value={formData.password} 
          onChange={(e)=>setFormData((prev)=>{
            return {...prev, password: e.target.value}})}
        />
        <input 
          type="password" 
          placeholder="Confirm Password" 
          className="input"
          value={formData.passwordConfirm} 
          onChange={(e)=>setFormData( prev => { return {...prev, passwordConfirm: e.target.value}})}
        />
        <button className="btn">Register</button>
      </form>

      {error && <Alert msg={error}/>}
    </section>
  )
}

export default Register
