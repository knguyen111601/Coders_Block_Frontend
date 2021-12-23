import {Route, Routes} from "react-router-dom"
import CreateDoc from "./CreateDoc"
import Home from "./Home"
import Show from "./Show"
import Login from "./Login"
import Signup from "./Signup"
import { useNavigate } from "react-router-dom"

const Main = () => {

    const token = window.localStorage.getItem("token")

    if (token) {return <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/:id" element={<Show />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/signup" element={<Signup />}/>
        <Route path="/create" element={<CreateDoc />}/>
        <Route path="/edit/:id" element={<CreateDoc />}/>
    </Routes>
    } else {
        return <Routes>
        <Route path="/" element={<Signup />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/signup" element={<Signup />}/>
        <Route path="/create" element={<Signup />}/>
    </Routes>
    }
}

export default Main