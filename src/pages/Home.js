import { GlobalCtx } from "../App"
import { useState, useContext, useEffect } from "react"
import { useNavigate, Link } from "react-router-dom"


const Home = (props) =>{

    const {gState} = useContext(GlobalCtx)
    const {url} = gState
    const token = JSON.parse(window.localStorage.getItem("token")).token
    const username = JSON.parse(window.localStorage.getItem("token")).user.username
    const pfp = JSON.parse(window.localStorage.getItem("token")).user.pfp
    const id = JSON.parse(window.localStorage.getItem("token")).user.id
    const [blogs, setBlogs] = useState(null)


    const getBlogs = async () =>{
        const response = await fetch(`${url}api/v1/blogs`, {
            method: "get",
            headers: {
                Authorization: `bearer ${token}`
            }
        })
        const json = await response.json()
        setBlogs(json)
    }

    useEffect(()=>{
        // console.log(token)
        getBlogs()
    }, [])

    const loaded = () => {
        return blogs.data.map((singleBlog)=>{
            let content = ""
            blogs.included.map((singleParagraph) => {
                if (singleParagraph.attributes.blog_id == singleBlog.id) {
                    if (singleParagraph.attributes.content.length >= 5) {
                        content = singleParagraph.attributes.content.substring(0, 49) + "..."
                    }
                }
            })
            if (singleBlog.attributes.user_id == id) {
            return <Link to={`/${singleBlog.id}`} style={{textDecoration:"none", color:"unset"}}>
            <div className="blogCard">
                    <div className="blogCardContent">
                        <div className="writtenBy">
                            <img src={pfp}/>
                            <p>{username}</p>
                        </div>



                        <h1>{singleBlog.attributes.title}</h1>
                        <p className="paragraphPeak">{content}</p>

                    </div>
                </div>
                </Link>} else {
                    return setBlogs(null)
                }
        })
    }

    const noblogs = <div>
        <div className="homeEmpty"></div>
        <div className="homeEmpty"></div>
        <div className="homeEmpty"></div>
        <div className="homeEmpty"></div>
        <div className="homeEmpty"></div>
    </div>







    return <div className="indexPage">
        {blogs ? loaded() : noblogs}
    </div>
}

export default Home