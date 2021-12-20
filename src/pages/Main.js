import {Route, Routes} from "react-router-dom"
import EditDoc from "../components/EditDoc"



const Main = () => {
    return <Routes>
        <Route path="/edit" element={<EditDoc/>}/>
    </Routes>
}

export default Main