import { useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'

//import '../style/App.css'
import "../Style/App.css";

function SignUp() {

    const [useData, setData] = useState({})
    const navigate = useNavigate()
useEffect(()=>{
    if(localStorage.getItem('login')){
        navigate('/')
    }
 })
    const handleSignUp = async () => {
        console.log(useData);

        let result = await fetch('https://todo-app-x7iw.onrender.com/signup', {
            method: 'post',
            body: JSON.stringify(useData),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        result = await result.json()

        if (result.success) {
            //navigate("/")
            console.log(result);
            document.cookie = "token=" + result.token
            localStorage.setItem("login", useData.email);
    navigate('/')
    window.dispatchEvent(new Event("localStorage-change"));
        }
        else {
    alert("try after some time");
}
    }

    return (
        <div className="container">
            <h1>Sign up</h1>

            <label htmlFor="">Name</label>
            <input
                onChange={(event) => setData({ ...useData, name: event.target.value })}
                type="text"
                name="name"
                id=""
                placeholder='enter name'
            />

            <label htmlFor="">Email</label>
            <input
                onChange={(event) => setData({ ...useData, email: event.target.value })}
                type="email"
                name="Email"
                id=""
                placeholder='enter email'
            />

            <label htmlFor="">Password</label>
            <input
                onChange={(event) => setData({ ...useData, password: event.target.value })}
                type="password"
                name="password"
                id=""
                placeholder='enter pass'
            />

            <button onClick={handleSignUp} className='submit'>SignUp</button>

            <Link className='Link' to="/login">Login</Link>
        </div>
    )
}

export default SignUp