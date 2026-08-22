import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login(){
    const navigate = useNavigate();
    const [loginUser, setLoginUser] = useState({
        email:"",
        password:""
    })

    const handleChange = (e) =>{
        setLoginUser({...loginUser, [e.target.name]: e.target.value});        
    }

    const submit = async() =>{
        try {
            await axios.post("http://localhost:8080/employee/login" , loginUser);
            alert("Login Success!");
            navigate("/dashboard");
        }catch(err){
            alert("Login Failed!");
        }
    }
    return (
        <>
            <h1>Login</h1>
            <input type="text" name="email" placeholder="Enter your email" onChange={handleChange}/>
            <input type="password" name="password" placeholder="Enter your password" onChange={handleChange}/>
            <button onClick={submit}>Login</button>
            <p>
                Don't have an Account? <br />
                <a href="/register">Register</a>
            </p>
        </>
    );
}
export default Login;