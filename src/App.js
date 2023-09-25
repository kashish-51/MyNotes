
import './App.css';
import {
  BrowserRouter as Router,
  Routes, // Use Routes instead of Switch
  Route,
} from "react-router-dom";
import About from './components/About';
import Home from './components/Home';
import Navbar from './components/Navbar';
import NoteState from './context/notes/NoteState';
import Alert from './components/Alert';
import Login from './components/Login';
import Signup from './components/Signup';
import { useState } from 'react';

function App() {
const[alert,SetAlert] = useState(null);
const showAlert = (message, type)=>{
  SetAlert({
    message: message,
    type: type
  })
  setTimeout( ()=>{
    SetAlert(null);
  },1500);
}

  return (
    <div className="">
      <NoteState>
        <Router>
          <Navbar />
          <Alert alert={alert} />
          <div className="container">
            <Routes >
              <Route exact path="/" element={<Home showAlert={showAlert}/>}></Route>        {/* Always use element to wrap up the components otherwise it will show component not found error */}
              <Route exact path="/about" element={<About />}> </Route>
              <Route exact path="/login" element={<Login showAlert={showAlert}/>}> </Route>
              <Route exact path="/signup" element={<Signup showAlert={showAlert}/>}></Route>
            </Routes>
          </div>
        </Router>
      </NoteState>
    </div>
  );
}

export default App;
