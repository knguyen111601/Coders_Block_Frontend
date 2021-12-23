import { GlobalCtx } from "../App"
import { useState, useContext, useEffect } from "react"
import { useNavigate, Link } from "react-router-dom"


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






    return <div className="signup">
        <form onSubmit={handleSubmit} className="signupForm">
            <h1>Signup</h1>
            <input type="text" name="username" value={form.username} placeholder="Username" onChange={handleChange} className="signupFormText"/>
            <input type="text" name="password" value={form.password} placeholder="Password" onChange={handleChange} className="signupFormText"/>
            <input type="submit" value="Signup" className="signupButton"/>
            <Link to="/login">
                <p className="already">Already have an account? Login here.</p>
            </Link>
        </form>
    </div>
}

export default Signup