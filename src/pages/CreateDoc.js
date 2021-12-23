import { GlobalCtx } from "../App"
import { useState, useContext, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import {BsPlusLg} from "react-icons/bs"

import TitleModal from "../components/TitleModal"
import EditBlog from "../components/EditBlog"

const CreateDoc = (props) =>{

    const params = useParams()
    const id = params.id
    
    const navigate = useNavigate()

    const {gState} = useContext(GlobalCtx)
    const {url, token, username} = gState

    const [blog, setBlog] = useState(null)

    const [creating, setCreating] = useState(null)
    const [editing, setEditing] = useState(null)

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

    useEffect(()=>{
        setNewParagraph({...newParagraph, order: order})
    }, [order])

    useEffect(()=>{
        setNewImage({...newImage, order: order})
    }, [order])

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
        setNewParagraph({...newParagraph, order: blog.included[blog.included.length-1].attributes.order + 1})
        setNewImage({...newImage, order: blog.included[blog.included.length-1].attributes.order + 1})
    }

    useEffect(()=>{
        if (id){
            setEditing(1)
            grabBlog()
        }
    }, [creating])

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
            <form onSubmit={addParagraph} className="formEdit">
                <input type="text" name="heading" value={newParagraph.heading} placeholder="Heading" onChange={handleChangeParagraph} className="headingEdit"/>
                <input type="text" name="content" value={newParagraph.content} placeholder="Content" onChange={handleChangeParagraph} className="contentEdit"/>
                <input type="text" name="subtext"  value={newParagraph.subtext} placeholder="Subtext" onChange={handleChangeParagraph} className="subtextEdit"/>
                <div style={{display:"flex", justifyContent:"center"}}>
                <button onClick={()=>{
                setOrder(order - 1)
                setCreating(null)}}
                className="editSubmit">Cancel</button>
                <input type="submit" value="Add" className="editSubmit"/>
                </div>
            </form>
        </div>

    const appendImage = <div>
        <form onSubmit={addImage} className="formEdit">
                <input type="text" name="heading" value={newImage.heading} placeholder="Heading" onChange={handleChangeImage} className="headingEdit"/>
                <input type="text" name="content" value={newImage.content} placeholder="Image Link" onChange={handleChangeImage} className="contentEdit"/>
                <input type="text" name="subtext"  value={newImage.subtext} placeholder="Subtext" onChange={handleChangeImage} className="subtextEdit"/>
                <div style={{display:"flex", justifyContent:"center"}}>
                <button onClick={()=>{
                setOrder(order - 1)
                setCreating(null)}}
                className="editSubmit">Cancel</button>
                <input type="submit" value="Add" className="editSubmit"/>
                </div>
        </form>
    </div>

    const paragraphBox = () => {
        setOrder(order + 1)
        setCreating(1)
    }

    const imageBox = () => {
        setOrder(order + 1)
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

            if (editing === 1) {
                return <EditBlog heading={singleItem.attributes.heading} content={singleItem.attributes.content} subtext={singleItem.attributes.subtext} id={singleItem.id} order={singleItem.attributes.order} setEditing={setEditing} blog_id={singleItem.attributes.blog_id} type="paragraphs"/>
            }

            return <div>
                <div>
                <h1>{singleItem.attributes.heading}</h1>
                </div>
                <p className="paragraph">{singleItem.attributes.content}</p>
                <p className="paragraphSubText">{singleItem.attributes.subtext}</p>
            </div>
        } else if (singleItem.type == "image") {
            if (editing === 1) {
                return <div>
                    <div style={{display:"flex", flexDirection:"column", alignItems:"center", marginBottom:"-30px", marginTop:"30px"}}>
                    <img className="editImage" src={singleItem.attributes.content}/>
                    <p>Preview</p>
                    </div>
                    <EditBlog heading={singleItem.attributes.heading} content={singleItem.attributes.content} subtext={singleItem.attributes.subtext} id={singleItem.id} order={singleItem.attributes.order} setEditing={setEditing} blog_id={singleItem.attributes.blog_id} type="images"/>
                    </div>
            }
            return <div>
                <div>
                <h1>{singleItem.attributes.heading}</h1>
                </div>
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

    const save = () =>{
        navigate("/")
    }

    const deleteBlog = () =>{
        fetch(`${url}/api/v1/blogs/${id}`, {
            method:"delete",
            headers: {
                "Authorization": `bearer ${token}`
            }
        })
        navigate("/")
    }

    return <div className="editDoc">
        <div className="page">
            <div className="docContent">
            {blog ? 
            <div>

                {/* TITLE AND AUTHOR */}
                {blog ?
                <div style={{display: "flex", justifyContent:"space-between", alignItems:"center"}}>
                <h1 className="titleOfBlog">{blog.data.attributes.title}</h1>
                 <div style={{width: "30%"}}>
                {id ? <button className="saveButton delete" onClick={deleteBlog}>Delete</button> : null}
                {id ? null : <button style={{visibility:"hidden"}} className="saveButton" onClick={save}>Save</button> }
                <button className="saveButton" onClick={save}>Save</button>
                 </div>
                </div>
                  : null}
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