import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard(){
    const navigate = useNavigate();
    const [users, setUsers] = useState([])
    const [user, setUser] = useState(null);
    const getUsers = async()=>{
        try{
            const res = await axios.get("http://localhost:8080/employee/get");
            setUsers(res.data)
        }catch(err){
            alert("Something went wrong");
        }
    }

    const logout = ()=>{
        navigate("/login");
    }

    const addUser = async () => {
        const name = prompt("Enter name:");
        const role = prompt("Enter role:");
        const email = prompt("Enter email:");
        const password = prompt("Enter password:");

        if (!name || !role || !email || !password) {
            return;
        }

        const newUser = {
            name,
            role,
            email,
            password
        };

        try {
            await axios.post(
                "http://localhost:8080/employee/add",
                newUser
            );

            alert("User Added Successfully!");
            getUsers();
        } catch (err) {
            console.error(err);
            alert("Add User Failed!");
        }
    };

    const updateUser = (user)=>{
        const name = prompt("Enter  new name: ",user.name);
        const role = prompt("Enter  new role: ",user.role);
        const email = prompt("Enter new email: ",user.email);
        const password = prompt("Enter new password: ",user.password);

        if (name === null || role === null || email === null || password === null) {
            return;
        }

        const updateUsers = {
            name:name,
            role:role,
            email:email,
            password:password
        }

        try {
            axios.put(`http://localhost:8080/employee/put/${user.id}`,updateUsers);
            alert("Update Success!");
            getUsers();
        }catch(err){
            alert("Update Failed!")
        }
    }

    const deleteUser = (user)=>{
        try {
            axios.delete(`http://localhost:8080/employee/delete/${user.id}`);
            alert("Deleted Successfully!");
            getUsers();
        }catch(err){
            alert("Delete Failed!")
        }
    }

    const getUser = async () => {
        const id = window.prompt("Enter employee ID:");

        if (!id) return;

        try {
            const res = await axios.get(
                `http://localhost:8080/employee/${id}`
            );

            console.log("Status:", res.status);
            console.log("Data:", res.data);

            if (res.data) {
                setUser(res.data);
            } else {
                setUser(null);
                alert("No employee found with that ID");
            }

        } catch (err) {
            console.error("ERROR:", err);
            alert("Something went wrong");
            setUser(null);
        }
    };
    return (
        <>
            <h1>Employee Management System</h1>
            <button onClick={addUser}>Add User</button>
            <button onClick={getUsers}>Get Users</button>
            <button onClick={getUser}>Get User</button>
            <button onClick={logout}>Logout</button>
            {user && (
                <div>
                    <h2>Employee Found</h2>
                    <p>ID: {user.id}</p>
                    <p>Name: {user.name}</p>
                    <p>Role: {user.role}</p>
                    <p>Email: {user.email}</p>
                </div>
            )}

            <table border={1}>
                <thead>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Role</th>
                    <th>Email</th>
                    <th>Password</th>
                    <th>Action</th>
                </thead>
                <tbody>
                    {users.map((user)=>(
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.role}</td>
                            <td>{user.email}</td>
                            <td>{user.password}</td>
                            <td>
                                <button onClick={()=>updateUser(user)}>Edit</button>
                                <button onClick={()=>deleteUser(user)}>Delete</button>
                            </td>
                        </tr>
                    ))} 
                </tbody>
            </table>
        </>
    );
}
export default Dashboard;