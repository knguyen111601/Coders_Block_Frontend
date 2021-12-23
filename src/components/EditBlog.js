import { GlobalCtx } from "../App"
import { useState, useContext, useEffect } from "react"
import {BsFillTrashFill} from "react-icons/bs"

const EditBlog = ({heading, content, subtext, order, id, setCreating, blog_id, type}) => {

    const {gState} = useContext(GlobalCtx)
    const {url, token} = gState

    const [currentParagraph, setCurrentParagraph] = useState({
        heading: heading,
        content: content,
        subtext: subtext,
        order: order,
        blog_id: blog_id
    })

    const putParagraph = (event) => {
        event.preventDefault()
        fetch (`${url}api/v1/${type}/${id}`, {
            method: "put",
            headers: {
                "Authorization": `bearer ${token}`,
                "Content-type": "application/json"
            },
            body: JSON.stringify(currentParagraph)
        })
    }   

    const deleteParagraph = (event) => {
        event.preventDefault()
        fetch (`${url}api/v1/${type}/${id}`, {
            method: "delete",
            headers: {
                "Authorization": `bearer ${token}`
            }
        })
    }   

    const handleChange = (event) => {
        const paragraphCopy = {...currentParagraph}
        paragraphCopy[event.target.name] = event.target.value
        setCurrentParagraph(paragraphCopy)
    }

    return <div className="editDiv">
            <button onClick={deleteParagraph} className="deleteButton"><BsFillTrashFill/></button>
            <form onSubmit={putParagraph} className="formEdit">
                <input type="text" name="heading" value={currentParagraph.heading} placeholder="Heading" onChange={handleChange} className="headingEdit"/>
                <textarea type="text" name="content" value={currentParagraph.content} placeholder="Content"  onChange={handleChange} className="contentEdit"/>
                <input type="text" name="subtext" value={currentParagraph.subtext}  placeholder="Subtext"  onChange={handleChange} className="subtextEdit"/>
                <input type="submit" value="Update" className="editSubmit"/>
            </form>
    </div>
}

export default EditBlog