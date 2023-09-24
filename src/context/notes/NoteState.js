import NoteContext from "./noteContext";
import {useState} from "react";

const NoteState = (props)=>{
  const host= "http://localhost:5000";
  const notesInitial=[]
  const[notes, setNotes] = useState(notesInitial);

//Get  all notes
const getNotes = async ()=>{
  //Api call
  const response = await fetch(`${host}/api/notes/fetchallnotes`, {
    method: "GET", 
    headers: {
      "Content-Type": "application/json",
      "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjUwZGI0OTgwOGU4YTA5ZDJmNTM2NzYyIn0sImlhdCI6MTY5NTQwMTI4Mn0.vo1pC4Pl0PKPu8Pn6bgJ6aniibL5vWKI9Q2i-WCspNk"
    },
     });
     const json = await response.json()
console.log(json)
setNotes(json)
}


//Add a note
const addNote = async (title,description,tag)=>{
  //Api call
  const response = await fetch(`${host}/api/notes/addnote`, {
    method: "POST", 
   
    headers: {
      "Content-Type": "application/json",
      "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjUwZGI0OTgwOGU4YTA5ZDJmNTM2NzYyIn0sImlhdCI6MTY5NTQwMTI4Mn0.vo1pC4Pl0PKPu8Pn6bgJ6aniibL5vWKI9Q2i-WCspNk"
    },
   
    body: JSON.stringify({title,description,tag}), 
  });
const note = await response.json();
setNotes(notes.concat(note))
}


//Delete a note
const deleteNote = async (id)=>{
  const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
    method: "DELETE", 
   
    headers: {
      "Content-Type": "application/json",
      "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjUwZGI0OTgwOGU4YTA5ZDJmNTM2NzYyIn0sImlhdCI6MTY5NTQwMTI4Mn0.vo1pC4Pl0PKPu8Pn6bgJ6aniibL5vWKI9Q2i-WCspNk"
    }
  });
const json=  response.json();
  
  const newNotes = notes.filter((note)=>{return note._id!==id})  //id notes._is is not equal id them it will remain in there otherwise it will be deleted
setNotes(newNotes)
}



//Edit a note
const editNote =async  (id, title,description,tag)=>{
  //Api call
  const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
    method: "PUT", 
   
    headers: {
      "Content-Type": "application/json",
      "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjUwZGI0OTgwOGU4YTA5ZDJmNTM2NzYyIn0sImlhdCI6MTY5NTQwMTI4Mn0.vo1pC4Pl0PKPu8Pn6bgJ6aniibL5vWKI9Q2i-WCspNk"
    },
   
    body: JSON.stringify({title,description,tag}), 
  });
const json= await response.json();


let newNotes = JSON.parse(JSON.stringify(notes))

  //logic to edit in client
  for (let index = 0; index < notes.length; index++) {
    const element = newNotes[index];
    if(element._id===id){
      newNotes[index].title=title;
      newNotes[index].description=description;
      newNotes[index].tag=tag;
      break;
    }
 
  }
  
  setNotes(newNotes);
}
return (
    <NoteContext.Provider value={{notes, addNote,deleteNote,editNote,getNotes}}>
        {props.children}
    </NoteContext.Provider>
)

}
export default  NoteState;