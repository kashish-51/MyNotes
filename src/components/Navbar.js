import React from 'react';
import { Link, useLocation} from "react-router-dom";
import {useNavigate} from 'react-router-dom';

const Navbar = () => {
  let navigate = useNavigate();   //this function will run only if person is already loged in
const handleLogout=()=>{
  localStorage.removeItem('token');
  navigate('/login');
}
  let location = useLocation();  //this is used for making navbar active

  return (
    <div>
  <nav className="d-flex items-center bg-gradient-to-r from-sky-950 to-cyan-800 text-white text-base font-semibold">
                <h1 className=" ml-[20px]">MyNotebook</h1>
                <div className="">
                <ul className=" d-flex items-center ml-[110vh] my-[10px] ">
                    <li className= {` ml-[30px]  ${location.pathname==="/"? "active": "" }`}><Link to="/">Home</Link></li>
                    <li className= {` ml-[30px]  ${location.pathname==="/about"? "active": "" }`}><Link to="/about">About </Link></li>
                    {/*if not equal to token then it will get directed to signup page*/ }
                    {!localStorage.getItem('token')?
                    <form className="d-flex"><li className=" ml-[30px]"><Link to="/login">  Login</Link></li>
                    <li className=" ml-[30px]"><Link to="/signup">Sign up</Link></li>
                    <li className="ml-[30px] "><Link to="/contact">Contact</Link></li>
                    </form>: <button onClick={handleLogout} className='btn bg-cyan-600 ml-4'>Log out </button>}
                </ul>
                </div>
            </nav>
    </div>
  )
}

export default Navbar
