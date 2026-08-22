import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Register(){
    const [user, setUser] = useState({
        name:"",
        role:"",
        email:"",
        password:""
    })
    const navigate = useNavigate();

    const handleChange = (e) =>{
        setUser({...user, [e.target.name]: e.target.value});
    };
    
    const register = ()=>{
        try{
            axios.post("http://localhost:8080/employee/add",user);
            alert("Registered Success!");
            navigate("/login");
        }
        catch(err){
            alert("Registeration Failed!");
        }
    }
    return (
        <>
            <h1>Register</h1>
            <input type="text" name="name" placeholder="Enter your name" onChange={handleChange}/>
            <input type="text" name="role" placeholder="Enter your role" onChange={handleChange}/>
            <input type="email" name="email" placeholder="Enter your email" onChange={handleChange}/>
            <input type="password" name="password" placeholder="Enter your password" onChange={handleChange}/>
            <button onClick={register}>Register</button>
            <p>
                Already have an account? <a href="/login">Login</a>
            </p>
        </>
    );
}
export default Register;