import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const HomePage = () => {
    const navigate = useNavigate();

    const [users, setUser] = useState<any>(null);

    const handleClick = async () => {
        try {
            const response = await fetch('http://localhost:5000/users');
            const data = await response.json();
            console.log('User inserted:', data);
            setUser(data);
        } catch (error) {
            console.error('Error fetching user:', error);
        }
    }

    const handleLogOut = async () => {
        localStorage.removeItem('token');
    }

    const handleLogIn = () => {
        navigate("/login")
    }

    return (<>
        <Link to={"/userInfo"}>user</Link>
        <Link to={"/createBlog"}>create blog</Link>

        <button onClick={handleLogOut} className="btn btn-primary">Log out</button>
        <button onClick={handleLogIn} className="btn btn-primary">Log in</button>

        <h1>homepage</h1>
        <button onClick={handleClick} className="btn btn-neutral">Neutral</button>
        {users?.length > 0 && (
            <div>
                <h3>Users List:</h3>
                <ul>
                    {users.map((user: any) => (
                        <li key={user.id}>
                            <strong>{user.username}</strong> - {user.email} - {user.role}
                        </li>
                    ))}
                </ul>
            </div>
        )}
    </>);
}

export default HomePage;