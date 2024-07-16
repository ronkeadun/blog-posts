import { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { deletePost, getUserPosts } from '../../controllers/postsController'
import { UserContext } from '../../contexts/UserContext'
import Post from '../../components/Post'
import Success from '../../components/Success'
import Alert from '../../components/Alert'

const Dashboard = () => {

  //Use User Context
  const {user, setUser} = useContext(UserContext)

  //Loading State
  const [loading, setLoading] = useState(true)

  //Error State
  const [error, setError] = useState(null)
  //Success State
  const [success, setSuccess] = useState(null)

  useEffect(()=>{
    setTimeout(async ()=>{
      //Grab user's posts
      const {userPosts, email} = await getUserPosts()
      //Update user state
      setUser({email, posts:userPosts })
      //Remove loading state
      setLoading(false)
    }, 500)
  }, [setUser])
  
  //Handle Post Deletion
  const handleDelete = async (_id)=>{
    if (window.confirm("Confirm Delete?")){
      try {
        const data = await deletePost(_id)
        setSuccess(data.success)
      } catch (error) {
        setError(error.message)
      }
      const newPost = user.posts.filter(post => post._id !== _id)
      setUser({...user, posts: newPost})
    }  
  }
  return (
    <section className="card">
      <p className="mb-2">{user.email}</p>
      <h2 className="title">User Dashboard</h2>

      {loading && (
        <i className="fa-solid fa-spinner animate-spin text-3xl text-center block"></i>
      )}

      {success && <Success msg={success}/>}
      {error && <Alert msg={error}/>}

      {user.posts && user.posts.map((post)=> (
        <div key={post._id}>
          <Post post={post}>
            <div className="flex gap-2">
              <Link title="update post" to="/update" 
              className="fa-solid fa-pen-to-square nav-link 
              text-green-500 hover:bg-green-200"
              state={post}></Link>
              <button title="delete post" className="fa-solid fa-trash-can nav-link 
              text-red-500 hover:bg-red-200"
              onClick={()=>handleDelete(post._id)}></button>
            </div> 
          </Post>
        </div>
      ) )}
    </section>
  )
}

export default Dashboard
