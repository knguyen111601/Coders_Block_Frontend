import { GlobalCtx } from "../App"
import { useState, useContext, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { get } from "jquery"

const Show = (props) => {

    const {gState} = useContext(GlobalCtx)
    const {url} = gState
    const token = JSON.parse(window.localStorage.getItem("token")).token
    const username = JSON.parse(window.localStorage.getItem("token")).user.username
    const params = useParams()
    const id = params.id

    const [blog, setBlog] = useState(null)

    const getBlog = async () => {
        const response = await fetch (`${url}api/v1/blogs/${id}`, {
            method: "get",
            headers: {
                "Authorization": `bearer ${token}`
            }
        })
        const data = await response.json()
        setBlog(data)
    }

    useEffect(()=>{
        getBlog()
    }, [])


   const content = () => {
        let order = []

        for (let i = 0; i<blog.included.length; i++) {
            order.push(blog.included[i])
        }

        order.sort((a,b)=>{
            return parseInt(a.attributes.order) - parseInt(b.attributes.order)
        })

        return order.map((singleItem)=>{
            if (singleItem.type == "paragraph") {
                return <div>
                    <h1>{singleItem.attributes.heading}</h1>
                    <p className="paragraph">{singleItem.attributes.content}</p>
                    <p className="paragraphSubText">{singleItem.attributes.subtext}</p>
                </div>
            } else if (singleItem.type == "image") {
                return <div>
                    <h1>{singleItem.attributes.heading}</h1>
                    <img className="image" src={singleItem.attributes.content}/>
                    <p className="paragraphSubText">{singleItem.attributes.subtext}</p>
                </div>
            }
        })
    }


    const title = () => {return <>
        <h1 className="titleOfBlog">{blog.data.attributes.title}</h1>
        <p className="author">Written by: {username}</p>
    </>}


    const emptyStateParagraph = (<div style={{marginTop: "50px"}}>
        <div className="emptyStateParagraph">
            <div className="emptyHeadParagraph"></div>
            <div className="emptyContent"></div>
            <div className="emptyContent"></div>
            <div className="emptyContent"></div>
        </div>
        <div className="emptyStateParagraph">
            <div className="emptyHeadParagraph"></div>
            <div className="emptyContent"></div>
            <div className="emptyContent"></div>
            <div className="emptyContent"></div>
        </div>
        <div className="emptyStateParagraph">
            <div className="emptyHeadParagraph"></div>
            <div className="emptyContent"></div>
            <div className="emptyContent"></div>
            <div className="emptyContent"></div>
        </div>
   </div>)

   const emptyStateTitle = (<div>
       <div className="emptyStateTitle">
           <div className="emptyTitle"></div>
           <div className="emptyAuthor"></div>
       </div>
   </div>)

    return <div className="editDoc">
        <div className="page">
            <div className="docContent">
                <Link to={`/edit/${id}`}>
                    <button>Edit</button>
                </Link>
                {blog ? title() : emptyStateTitle}
                {blog ? content() : emptyStateParagraph}
            </div>
        </div>
    </div>
}

export default Show