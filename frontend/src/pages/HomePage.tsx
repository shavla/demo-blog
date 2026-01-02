import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../customHooks/AuthHook";
import { BASE_URL } from "../utils/consts";
import image from "../assets/register_img.png";

const HomePage = () => {
    const { token, isAuthenticated } = useAuth();
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

    if (!isAuthenticated) {
        return (<>
            <div className="bg-primary h-[calc(100vh-80px)] flex items-center relative overflow-hidden">
                <div className="absolute right-0 h-1/2 z-0 md:h-4/5">
                    <img className="w-full h-full object-contain" src={image} alt="register image" />
                </div>
                <div className="w-full max-w-4xl ml-12 lg:mx-auto z-10">
                    <h1 className="font-bold text-8xl">Human<br />stories & ideas</h1>
                    <p className="font-thin text-2xl mt-4">A place to read, write, and deepen your understanding</p>
                    <Link className="inline-block text-lg mt-8 bg-slate-950 text-green-50 rounded-full px-8 py-2"
                        to="/register">Get started</Link>
                </div>
            </div>
        </>)
    }

    return (<>
        <h1>HomePage</h1>
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