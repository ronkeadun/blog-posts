import { useContext, useState } from 'react'
import Alert from '../../components/Alert'
import { createPost } from '../../controllers/postsController'
import { PostContext } from '../../contexts/PostContext'
import { useNavigate } from 'react-router-dom'

const Create = () => {
    //Use Post's Context
    const {posts, setPosts} = useContext(PostContext)

    //Use Navigate Hook
    const navigate = useNavigate()

    //Error State
    const [error, setError] = useState(null)

    //Form Data State
    const [title, setTitle] = useState("")
    const [body, setBody] = useState("")

    const handleCreate = async(e)=> {
        e.preventDefault()
        try {
            //Create A New Post
            const data = await createPost(title, body)
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
            <h2 className="title">Create A New Post</h2>

            <form onSubmit={handleCreate}>
                <input type="text" 
                    placeholder="Post's Title"
                    className="input" 
                    value={title}
                    onChange={(e)=>setTitle(e.target.value)}
                    autoFocus/>
                <textarea rows="7" placeholder="Post Content" 
                    value={body}
                    onChange={(e)=>setBody(e.target.value)}
                    className="input">
                </textarea>

                <button className="btn" onClick={handleCreate}>Create Post</button>
            </form>

            {error && <Alert msg={error}/> }
        </section>
    )
}

export default Create
