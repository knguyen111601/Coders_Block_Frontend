import {BsPlusLg} from "react-icons/bs"
import $ from "jquery"

const EditDoc = () =>{




    return <div className="editDoc">
        <div className="page">
            <div className="docContent">
                
                {/* TITLE AND AUTHOR */}
                <input type="text" className="titleEdit" placeholder="Enter a Title"/>
                <p>Written by: Author Name</p>

                {/* ADD BUTTONS */}
                <div className="docAddButtons">
                    <button><div className="addButtonsDiv"><BsPlusLg/>Add Paragraph</div></button>
                    <p style={{margin:"auto"}}>Or</p>
                    <button><div className="addButtonsDiv"><BsPlusLg/>Add Image</div></button>
                </div>





            </div>
        </div>
    </div>
}

export default EditDoc