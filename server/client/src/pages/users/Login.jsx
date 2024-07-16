import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"

import Alert from "../../components/Alert"
import { loginUser } from "../../controllers/usersController"
import { UserContext } from "../../contexts/UserContext"

const Login = () => {

  //Use User Context
  const {setUser} = useContext(UserContext)

  //Use navigate hook
  const navigate = useNavigate()

  //Error State
  const [error, setError] = useState(null)

  //Form data state
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  //Handle Login
  const handleLogin = async(e)=>{
    e.preventDefault()
    try {
      //Login the user
      await loginUser(email, password)
      //Update the user's state
      setUser({email, posts:[]})
      //Navigate to Dashboard
      navigate("/dashboard")

    } catch (error) {
      setError(error.message)
    }
  }
  
  return (
    <section className="card" style={{maxWidth:'960px'}  }>
      <h2 className="title">Login to your account</h2>

      <form onSubmit={handleLogin}>
        <input 
          type="email" 
          placeholder="Email Address" 
          className="input"
          value={email} 
          onChange={(e)=>setEmail(e.target.value)}
          autoFocus
        />
        <input 
          type="password" 
          placeholder="Password" 
          className="input"
          value={password} 
          onChange={(e)=>setPassword(e.target.value)}
        />
        <button className="btn">Login</button>
      </form>

      {error && <Alert msg={error}/>}
    </section>
  )
}

export default Login
