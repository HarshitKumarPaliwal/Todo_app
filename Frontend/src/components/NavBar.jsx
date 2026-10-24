
import '../Style/NavBar.css'
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
function NavBar(){
    const [login, setLogin] = useState(localStorage.getItem('login'))
    const navigate = useNavigate()

    const logout = () => {
        console.log("test");

        localStorage.removeItem('login');
        setLogin(null)
       
       setTimeout(()=>{
navigate('/login')
       },0);
    }
  useEffect(() => {

        const handleStorage = () => {
            setLogin(localStorage.getItem('login'))
        }

        window.addEventListener("localStorage-change", handleStorage)
  return () => {
            window.removeEventListener("localStorage-change", handleStorage)
        }

    }, [])
  return(
    <nav className="navbar">
    <div className="logo">to-do app</div>
    
    <ul className="nav-links" >
      {login ?(
    <>
    <li><Link to="/">List</Link></li>
       <li><Link to="/Add">Add data</Link></li>
        <li><Link onClick={logout}>Logout</Link></li>

    
    </>):null  
    
    
    }
      
    </ul>
    
    </nav>
  )  
}export default NavBar;