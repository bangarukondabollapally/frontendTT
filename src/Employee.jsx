import {useEffect, useState} from "react";
import axios from "axios";

function Employee(){
    const [employee, setEmployee] = useState([]);
    const [errors,setErrors] = useState({});
    const [formData,setFormData]=useState({
        id:"",
        name:"",
        role:"",
        email:"",
        password:""
    });

    const handleChange = (e)=>{
        const {name,value} = e.target;
        setErrors({...errors,[name]:""});
        setFormData({...formData,[name]: value});
    }

    const getEmployee = ()=>{
        axios.get("http://localhost:8080/employee/get")
            .then((res)=>{
                setEmployee(res.data);
            })
    }

    useEffect(() => {
        getEmployee();
    }, []);

    const handleSubmit = (e)=>{
        e.preventDefault();
        const newErrors = {};
        if(formData.name===""){
            newErrors.name = "Name is required";
        }
        if(formData.role===""){
            newErrors.role = "Role is required";
        }
        if(formData.email===""){
            newErrors.email = "Email is required";
        }
        if(formData.password==="" && formData.id===""){
            newErrors.password = "Password is required";
        }

        if(Object.keys(newErrors).length>0){
            setErrors(newErrors);
            return
        }

        const resetForm = ()=>{
            setFormData({
                id:"",
                name:"",
                role:"",
                email:"",
                password:""
            });
        }

        if(formData.id===""){
            axios.post("http://localhost:8080/employee/add",formData)
                .then(()=>{
                    getEmployee();
                    resetForm();
            })
        }else{
            axios.put(`http://localhost:8080/employee/put/${formData.id}`,formData)
                .then(()=>{
                    getEmployee();
                    resetForm();
                })
        }
    }
    const handleEdit = (emp)=>{
        setFormData({
            id:emp.id,
            name:emp.name,
            role:emp.role,
            email:emp.email,
            password:emp.password,
        })
    }

    const handleDelete = (emp)=>{
        axios.delete(`http://localhost:8080/employee/delete/${emp.id}`)
            .then(()=>{
                getEmployee();
            })
            .catch((err)=>{
                console.log(err);
            })
    }
    return(
      <div>
          <h2>Employee Registration Form</h2>
          <form onSubmit={handleSubmit}>
              Name
              <input  name="name" value={formData.name} type="text" placeholder="Enter your Name" onChange={handleChange}/>
              <p>{errors.name}</p>
              <br/>
              Role
              <input name="role" value={formData.role} type="text" placeholder="Enter your Role" onChange={handleChange}/>
              <p>{errors.role}</p>
              <br/>
              Email
              <input name="email" value={formData.email} type="email" placeholder="Enter your Email" onChange={handleChange}/>
              <p>{errors.email}</p>
              <br/>
              Password
              <input name="password" value={formData.password} type="password" placeholder="Enter your Password" onChange={handleChange}/>
              <p>{errors.password}</p>
              <br/>
              <button type="submit">{formData.id==="" ? "Register" : "Update"}</button>
          </form>

          <table border={1} cellSpacing={5} cellPadding={10} style = {{marginTop: "2rem", marginLeft: "auto", marginRight: "auto"}} >
              <thead>
                    <tr>
                        <th>Name</th>
                        <th>Role</th>
                        <th>Email</th>
                        <th>Password</th>
                        <th>Action</th>
                    </tr>
              </thead>
              <tbody>
                  {employee.map((emp, idx) => (
                      <tr key={emp.id ?? idx}>
                          <td>{emp.name}</td>
                          <td>{emp.role}</td>
                          <td>{emp.email}</td>
                          <td>{emp.password}</td>
                          <td>
                              <button type="button" onClick={()=>handleEdit(emp)}>Edit</button>
                              <button type="button" onClick={()=>handleDelete(emp)}>Delete</button>
                          </td>
                      </tr>
                  ))}
              </tbody>
          </table>
      </div>
    );
}
export default Employee;