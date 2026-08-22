import { useNavigate } from "react-router-dom";

function Home() {
    const navigate = useNavigate();

    const login = () => {
        navigate("/login");
    };

    return (
        <>
            <h1>Welcome to Employee Management System</h1>
            <button onClick={login}>Login</button>
        </>
    );
}

export default Home;