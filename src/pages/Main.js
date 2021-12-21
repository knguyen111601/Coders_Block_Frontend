import {Route, Routes} from "react-router-dom"
import EditDoc from "./EditDoc"
import Home from "./Home"
import Login from "./Login"
import Signup from "./Signup"

const Main = () => {
    return <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/signup" element={<Signup />}/>
        <Route path="/edit" element={<EditDoc/>}/>
    </Routes>
}

export default Main