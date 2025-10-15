import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../customHooks/AuthHook";
import { BASE_URL } from "../utils/consts";

const HomePage = () => {
    const navigate = useNavigate();

    const [users, setUser] = useState<any>(null);

    const { logout, token } = useAuth();

    const handleClick = async () => {
        try {
            const response = await fetch(BASE_URL + '/users', {
                headers: { Authorization: `Bearer ${token}` }
            });
            const data = await response.json();
            console.log('User inserted:', data);
            setUser(data);
        } catch (error) {
            console.error('Error fetching user:', error);
        }
    }

    const handleLogOut = async () => {
        logout();
    }

    const handleLogIn = () => {
        navigate("/login");
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