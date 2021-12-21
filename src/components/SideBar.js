import {Link, useNavigate } from "react-router-dom"

const SideBar = () =>{

    const navigate = useNavigate()

    const logout = (event) =>{
        event.preventDefault()
        window.localStorage.removeItem("token")
        navigate("/signup")
    }



    return <div className="sideBar">
        <div className="sideBarContent">
        <h1>SideBar</h1>
        <Link to="/signup">
            <h1>Signup</h1>
        </Link>

        <Link to="/login">
            <h1>Login</h1>
        </Link>


            <h1 onClick={logout}>Logout</h1>

        </div>
    </div>
}

export default SideBar