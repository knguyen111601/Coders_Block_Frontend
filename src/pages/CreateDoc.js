import { GlobalCtx } from "../App"
import { useState, useContext, useEffect } from "react"
import { useParams } from "react-router-dom"
import {BsPlusLg} from "react-icons/bs"

import $, { get } from "jquery"
import TitleModal from "../components/TitleModal"

const CreateDoc = (props) =>{

    const params = useParams()
    const id = params.id
    
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

    const [newImage, setNewImage] = useState({
        heading: "",
        content: "",
        subtext: "",
        order: order,
        blog_id: null
    })

    const getBlog = async () => {
        const response = await fetch(`${url}api/v1/blogs/${blog.data.id}`, {
            method:"get",
            headers: {
                "Authorization": `bearer ${token}`
            }
        })
        const data = await response.json()
        setBlog(data)
    }

    const grabBlog = async () => {
        const response = await fetch(`${url}api/v1/blogs/${id}`, {
            method:"get",
            headers: {
                "Authorization": `bearer ${token}`
            }
        })
        const data = await response.json()
        setBlog(data)
        setOrder(blog.included[blog.included.length-1].attributes.order + 1)
        setNewParagraph({...newParagraph, order: order})
        setNewImage({...newImage, order: order})
    }

    useEffect(()=>{
        if (id){
            grabBlog()
        }
    }, [])

    useEffect(()=>{
        getBlog()
    }, [newParagraph, newImage])
    
    useEffect(()=>{
        if (blog) {
            setNewParagraph({...newParagraph, blog_id: blog.data.id})
            setNewImage({...newImage, blog_id: blog.data.id})
        }
    }, [blog])


    const addParagraph = (event) => {
        event.preventDefault()
        fetch (`${url}api/v1/paragraphs`, {
            method: "post",
            headers: {
                "Authorization": `bearer ${token}`,
                "Content-type": "application/json"
            },
            body: JSON.stringify(newParagraph)
        })
        .then((response)=>{response.json()})
        .then((data)=>{
            setCreating(null)
            setOrder(order + 1)
            setNewParagraph({
                heading: "",
                content: "",
                subtext: "",
                order: order + 1,
                blog_id: blog ? blog.id : null
            })
            setNewImage({
                heading: "",
                content: "",
                subtext: "",
                order: order + 1,
                blog_id: blog ? blog.id : null
            })
        })
    }

    const addImage = (event) => {
        event.preventDefault()
        fetch(`${url}api/v1/images`, {
            method: "post",
            headers: {
                "Authorization": `bearer ${token}`,
                "Content-type": "application/json"
            },
            body: JSON.stringify(newImage)
        })
        .then((response)=> {response.json()})
        .then((data)=>{
            setCreating(null)
            setOrder(order + 1)
            setNewImage({
                heading: "",
                content: "",
                subtext: "",
                order: order,
                blog_id: blog ? blog.id : null
            })
            setNewParagraph({
                heading: "",
                content: "",
                subtext: "",
                order: order + 1,
                blog_id: blog ? blog.id : null
            })
        })
    }

    const handleChangeParagraph = (event) =>{
        const paragraphCopy = {...newParagraph}
        paragraphCopy[event.target.name] = event.target.value
        setNewParagraph(paragraphCopy)
    }

    const handleChangeImage = (event) => {
        const imageCopy = {...newImage}
        imageCopy[event.target.name] = event.target.value
        setNewImage(imageCopy)
    }


    const appendParagraph = <div>
            <button onClick={()=>{setCreating(null)}}>Cancel</button>
            <form onSubmit={addParagraph}>
                <input type="text" name="heading" value={newParagraph.heading} placeholder="Heading" onChange={handleChangeParagraph}/>
                <input type="text" name="content" value={newParagraph.content} placeholder="Paragraph Content" onChange={handleChangeParagraph}/>
                <input type="text" name="subtext"  value={newParagraph.subtext} placeholder="Subtext" onChange={handleChangeParagraph}/>
                <input type="submit" value="Add"/>
            </form>
        </div>

    const appendImage = <div>
        <button onClick={()=>{setCreating(null)}}>Cancel</button>
        <form onSubmit={addImage}>
                <input type="text" name="heading" value={newImage.heading} placeholder="Heading" onChange={handleChangeImage}/>
                <input type="text" name="content" value={newImage.content} placeholder="Image Link" onChange={handleChangeImage}/>
                <input type="text" name="subtext"  value={newImage.subtext} placeholder="Subtext" onChange={handleChangeImage}/>
                <input type="submit" value="Add"/>
        </form>
    </div>

    const paragraphBox = () => {
        setCreating(1)
    }

    const imageBox = () => {
        setCreating(2)
    }
    
    const addButtons =  <div className="docAddButtons">
        <button onClick={paragraphBox}><div className="addButtonsDiv"><BsPlusLg/>Add Paragraph</div></button>
        <p style={{margin:"auto"}}>Or</p>
        <button onClick={imageBox}><div className="addButtonsDiv"><BsPlusLg/>Add Image</div></button>
    </div>


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

    const buttons = () =>{
        if (creating === 1) {
            return appendParagraph
        } else if (creating === 2) {
            return appendImage
        } else if (creating === null) {
            return addButtons
        }
    }



    return <div className="editDoc">
        <div className="page">
            <div className="docContent">
            {blog ? 
            <div>


                {/* TITLE AND AUTHOR */}
                <h1 className="titleOfBlog">{blog.data.attributes.title}</h1>
                <p className="author">Written by: {username}</p>

                {blog.included ? content() : null}
                <div>
                {buttons()}
                </div>
            
            
            
            
            
            
            </div>











            : <TitleModal setBlog={setBlog}/>}  
            </div>
        </div>
    </div>
}

export default CreateDoc