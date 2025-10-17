import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../customHooks/AuthHook";
import { BASE_URL } from "../utils/consts";

const HomePage = () => {
    const navigate = useNavigate();

    const [users, setUser] = useState<any>(null);
    const [blogs, setBlogs] = useState<any>(null);

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

    const { logout, token } = useAuth();

    useEffect(() => {
        if (!token) return;

        const fetchBlogs = async () => {
            try {
                console.log('Using token:', token);
                const response = await fetch(BASE_URL + '/blogs', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                const data = await response.json();
                console.log('Blogs fetched:', data);
                setBlogs(data);
            } catch (error) {
                console.error('Error fetching blogs:', error);
            }
        };

        fetchBlogs();
    }, [token]);

    const handleBlogClick = (id: number) => {
        navigate(`/blogDetail/${id}`);
    }

    return (<>
        <Link to={"/userInfo"}>user</Link>
        <Link to={"/createBlog"}>create blog</Link>

        <button onClick={handleLogOut} className="btn btn-primary">Log out</button>
        <button onClick={handleLogIn} className="btn btn-primary">Log in</button>

        <h1>homepage</h1>
        <button onClick={handleClick} className="btn btn-neutral">Neutral</button>
        {blogs?.length > 0 && (
            <div>
                <h1>blogs</h1>
                {blogs.map((blog: any) => (
                    <div onClick={() => handleBlogClick(blog.blog_id)} key={blog.blog_id} className="flex">
                        <p className="mr-3">{blog.username}</p>
                        <p>{blog.title}</p>
                    </div>
                ))}
            </div>
        )}

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