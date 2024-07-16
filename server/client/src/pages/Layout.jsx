import { Fragment, useContext } from "react"
import { Link, Outlet, useNavigate } from "react-router-dom"
import { UserContext } from "../contexts/UserContext"

const Layout = () => {
    const navigate = useNavigate()
    //Use User Context
    const {user, setUser} = useContext(UserContext)

    //Handle User Logout
    const handleLogout = ()=>{
        if (window.confirm("Confirm Logout?")){
            setUser({email:null, posts: []})
            localStorage.removeItem("email")
            localStorage.removeItem("token")
            navigate("/")
        }
    }

    return (
      <Fragment>
        <header className="bg-indigo-500 text-white">
            <nav className="flex items-center justify-between p-4">
                <Link to="/" 
                    title="home"
                    className="fa-solid fa-house-chimney nav-link">
                </Link>
                
                {(user.email? 
                    (<div className="flex items-center gap-4">
                        <Link to="/create" 
                            title="Create Post"
                            className="fa-solid fa-circle-plus nav-link">
                        </Link>
                        <Link to="/dashboard" 
                            title="Dashboard"
                            className="fa-solid fa-circle-user nav-link">
                        </Link>
                        <button title="Logout" onClick={handleLogout}
                            className="fa-solid fa-right-from-bracket nav-link"
                        ></button>
                    </div>) : 
                    (<div className="flex items-center gap-4">
                        <Link to="/login" 
                            title="Login"
                            className="fa-solid fa-right-to-bracket nav-link">
                        </Link>
                        <Link to="/register" 
                            title="Register"
                            className="fa-solid fa-user-plus nav-link">
                        </Link>
                    </div>)
                )}
            </nav>
        </header>
        <main className="p-4">
            <Outlet/>
        </main>
      </Fragment>
  )
}

export default Layout
