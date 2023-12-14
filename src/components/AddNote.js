import React, {useContext, useState} from 'react'
import noteContext from '../context/notes/noteContext'; 

const AddNote = (props) => {
    const context = useContext(noteContext);
    const { addNote} = context;
const[note,setNote]= useState({title:"", description: "", tag: ""})

 const handleClick = (e)=>{
    e.preventDefault();
addNote(note.title, note.description, note.tag);
setNote({title:"", description: "", tag: ""})
props.showAlert("Added successfully", "success");

    }
    const onChange=(e)=>{
setNote({...note, [e.target.name]: e.target.value})  
    }
  return (
    <div className="container px-[50vh] my-5">
    <h1 className= "text-2xl font-bold ">Add a Note</h1>
  
    <form>
  <div className="mb-3 my-5">
    <label htmlFor="title" className="form-label">Title</label>
    <input type="text" className="form-control" id="title" name="title"aria-describedby="emailHelp"  value={note.title} onChange={onChange} minLength={5} required/>
  </div>
  <div className="mb-3">
    <label htmlFor="description" className="form-label">Description</label>
    <input type="text" className="form-control" id="description"  name="description"  value={note.description} onChange={onChange} minLength={5} required/>
  </div>
  <div className="mb-3">
    <label htmlFor="tag" className="form-label">Tag</label>
    <input type="text" className="form-control" id="tag"name="tag" value={note.tag} onChange={onChange}/>
  </div>
  <button disable={note.title.length<5 || note.description.length<5} type="submit" className="btn bg-cyan-400 text-black"   onClick={handleClick} minLength={5} required>Add note</button>
</form>

</div>
  )
}
export default AddNote
