import React, {useContext} from 'react'
import noteContext from '../context/notes/noteContext'; 
const Noteitem = (props) => {
    const context = useContext(noteContext);
    const { deleteNote } = context;
    const { note, updateNote } = props;

    return (
        <div className=" my-3 w-[15rem] ml-[200px] table-row ">
            <div className="card" >
                <div className="card-body">
                    <h5 className="card-title font-bold">{note.title}</h5>
                    <p className="card-text">{note.description}</p>
                    <div className="cursor-pointer">
                    <i className="fa-solid fa-trash" onClick={()=>{deleteNote(note._id)}}></i>
                    <i className="fa-solid fa-pen-to-square mx-3" onClick={()=>{updateNote(note)}}></i>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Noteitem
