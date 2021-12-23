import {Link, useNavigate } from "react-router-dom"
import {HiHome} from "react-icons/hi"
import {FiEdit, FiLogIn, FiLogOut} from "react-icons/fi"
import {BiCoffee} from "react-icons/bi"
import { GlobalCtx } from "../App"
import {useContext } from "react"

const SideBar = () =>{

    const navigate = useNavigate()

    const {gState} = useContext(GlobalCtx)
    const token = window.localStorage.getItem("token")

    const logout = (event) =>{
        event.preventDefault()
        window.localStorage.removeItem("token")
        navigate("/signup")
    }

    return <div className="sideBar">
        <div className="sideBarContent">

        <h1 className="appName"><BiCoffee/><span className="sideBarText appNameText">Coder's Block</span></h1>


        <Link to="/" className="link">
            <h1><HiHome/><span className="sideBarText">Home</span></h1>
        </Link>

        <Link to="/create" className="link">
            <h1><FiEdit/><span className="sideBarText">Create</span></h1>
        </Link>

        {token ? null : <Link to="/signup" className="link">
        <h1><FiLogIn/><span className="sideBarText">Signup</span></h1>
    </Link>}
        </div>
        
        <div className="logoutSection">
         {token ? <h1 className="logout" onClick={logout}><FiLogOut/><span className="sideBarText">Logout</span></h1> : null }
        </div>
        
    </div>
}

export default SideBar