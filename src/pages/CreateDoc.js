import { GlobalCtx } from "../App"
import { useState, useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import {BsPlusLg} from "react-icons/bs"

import $ from "jquery"
import TitleModal from "../components/TitleModal"

const CreateDoc = (props) =>{

    const {gState} = useContext(GlobalCtx)
    const {url, token, username} = gState

    const [blog, setBlog] = useState(null)

    const [creating, setCreating] = useState(null)

    const [order, setOrder] = useState(1)

    const [newParagraph, setNewParagraph] = useState({
        heading: "",
        content: "",
        subtext: "",
        order: order,
        blog_id: null
    }) 

    useEffect(()=>{
        if (blog) {setNewParagraph({...newParagraph, blog_id: blog.data.id})}
    }, [])


    



    const addParagraph = (event) => {
        event.preventDefault()
        fetch (`${url}api/v1/blogs`, {
            method: "post",
            headers: {
                "Content-type": "application/json",
                "Authorization": `bearer ${token}`
            },
            body: JSON.stringify(newParagraph)
        })
        .then((response)=>{response.json()})
        .then((data)=>{
            setCreating(null)
            setNewParagraph({
                heading: "",
                content: "",
                subtext: "",
                order: order + 1,
                blog_id: blog ? parseInt(blog.id) : null
            })
        })
    }

    const handleChangeParagraph = (event) =>{
        const paragraphCopy = {...newParagraph}
        paragraphCopy[event.target.name] = event.target.value
        setNewParagraph(paragraphCopy)
    }



    const appendParagraph = <div>
            <form onSubmit={addParagraph}>
                <input type="text" name="heading" value={newParagraph.heading} onChange={handleChangeParagraph}/>
                <input type="text" name="content" value={newParagraph.content} onChange={handleChangeParagraph}/>
                <input type="text" name="subtext"/>
                <input type="submit" value="Add"/>
            </form>
        </div>

    const paragraphBox = () => {
        setCreating(1)
    }
    
    const addButtons =  <div className="docAddButtons" onClick={paragraphBox}>
        <button><div className="addButtonsDiv"><BsPlusLg/>Add Paragraph</div></button>
        <p style={{margin:"auto"}}>Or</p>
        <button><div className="addButtonsDiv"><BsPlusLg/>Add Image</div></button>
    </div>




    return <div className="editDoc">
        <div className="page">
            <div className="docContent">
            {blog ? 
            <div>


                {/* TITLE AND AUTHOR */}
                <h1 className="titleOfBlog">{blog.data.attributes.title}</h1>
                <p className="author">Written by: {username}</p>


                {creating === 1 ? appendParagraph : addButtons}
            
            
            
            
            
            
            
            </div>











            : <TitleModal setBlog={setBlog}/>}  
            </div>
        </div>
    </div>
}

export default CreateDoc