import { GlobalCtx } from "../App"
import { useState, useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import {BsPlusLg} from "react-icons/bs"

import $ from "jquery"
import TitleModal from "../components/TitleModal"

const EditDoc = (props) =>{

    const {gState} = useContext(GlobalCtx)
    const {url, token, username} = gState

    const [blog, setBlog] = useState(null)

    const addButtons =  <div className="docAddButtons">
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
                <p>Written by: {username}</p>



            
            
            
            
            
            
            
            </div>











            : <TitleModal setBlog={setBlog}/>}  
            </div>
        </div>
    </div>
}

export default EditDoc