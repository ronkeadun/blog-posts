import { useContext, useState } from 'react'
import Alert from '../../components/Alert'
import { updatePost } from '../../controllers/postsController'
import { PostContext } from '../../contexts/PostContext'
import { useLocation, useNavigate } from 'react-router-dom'

const Update = () => {
    //Use Post's Context
    const {posts, setPosts} = useContext(PostContext)

    //Use Navigate Hook
    const navigate = useNavigate()
    const {state} = useLocation()

    //Error State
    const [error, setError] = useState(null)

    //Form Data State
    const [title, setTitle] = useState(state.title)
    const [body, setBody] = useState(state.body)

    const handleUpdate = async(e)=> {
        e.preventDefault()
        try {
            //Update A New Post
            const data = await updatePost(state._id, title, body)
            //Update the Post's State
            setPosts([...posts, data.post])
            //Navigate to the Dashboard
            navigate("/dashboard")
        } catch (error) {
            setError(error.message)
        }
    }

    return (
        <section className="card" style={{maxWidth:'960px'}}>
            <h2 className="title">Update A New Post</h2>

            <form onSubmit={handleUpdate}>
                <input type="text" 
                    placeholder="Post's Title"
                    className="input" 
                    value={title}
                    onChange={(e)=>setTitle(e.target.value)}
                    autoFocus/>
                <textarea rows="7" placeholder="Update Content" 
                    value={body}
                    onChange={(e)=>setBody(e.target.value)}
                    className="input">
                </textarea>

                <button className="btn" onClick={handleUpdate}>Update Post</button>
            </form>

            {error && <Alert msg={error}/> }
        </section>
    )
}

export default Update
