import {Route, Routes} from "react-router-dom"
import CreateDoc from "./CreateDoc"
import Home from "./Home"
import Show from "./Show"
import Login from "./Login"
import Signup from "./Signup"

const Main = () => {
    return <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/:id" element={<Show />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/signup" element={<Signup />}/>
        <Route path="/create" element={<CreateDoc />}/>
        <Route path="/edit/:id" element={<CreateDoc />}/>
    </Routes>
}

export default Main