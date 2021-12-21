import { GlobalCtx } from "../App"
import { useState, useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"


const Signup = (props) => {

    const {gState, setGstate, token} = useContext(GlobalCtx)
    const {url} = gState
    const navigate = useNavigate()

    const [form, setForm] = useState({
        username: "",
        password: ""
    })

    const handleChange = (event) => {
        const newForm = {...form}
        newForm[event.target.name] = event.target.value
        setForm(newForm)
    }

    const handleSubmit = (event) =>{
        event.preventDefault();
        const {username, password} = form
        fetch(`${url}signup`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        }, 
        body: JSON.stringify({username, password})
    })
    .then((response)=> response.json())
    .then((data)=>{
        console.log(data)
        setForm({
            username: "",
            password: ""
        })
        navigate("/login")
    })
    }






    return <div>
        <form onSubmit={handleSubmit}>
            <input type="text" name="username" value={form.username} placeholder="Username" onChange={handleChange}/>
            <input type="text" name="password" value={form.password} placeholder="Password" onChange={handleChange}/>
            <input type="submit" value="Signup"/>
        </form>
    </div>
}

export default Signup