import { GlobalCtx } from "../App"
import { useState, useContext, useEffect } from "react"

const TitleModal = ({setBlog}) =>{

    const {gState} = useContext(GlobalCtx)
    const {url, user_id, token} = gState

    const [title, setTitle] = useState({
        title: "",
        user_id: null
    })


    const handleChange = (event) => {
        const newTitle = {...title}
        newTitle[event.target.name] = event.target.value
        newTitle["user_id"] = user_id
        setTitle(newTitle)
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        const response = await fetch (`${url}api/v1/blogs`, {
            method: "post",
            headers: {
                "Content-type": "application/json",
                "Authorization": "bearer " + token
            },
            body: JSON.stringify(title)
        })
        const data = await response.json()
        setTitle({
            title: "",
            user_id: null
        })
        setBlog(data)
    }



    return <div className="modalBackground">
        <div className="titleModal">
            <h1>Enter a Title</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" name="title" value={title.title} onChange={handleChange}/>
                <input type="submit"/>
            </form>
        </div>
    </div>
}

export default TitleModal