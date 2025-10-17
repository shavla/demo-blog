import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BASE_URL } from "../utils/consts";
import { useAuth } from "../customHooks/AuthHook";

const BlogDetailPage = () => {
    const { id } = useParams();
    const [blog, setBlog] = useState<any>(null);
    const { token } = useAuth();

    const navigate = useNavigate();

    useEffect(() => {
        if (!token) return;

        const fetchBlogs = async () => {
            try {
                console.log('Using token:', token);
                const response = await fetch(BASE_URL + `/blog/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                const data = await response.json();
                console.log('Blogs fetched:', data);
                setBlog(data);
            } catch (error) {
                console.error('Error fetching blogs:', error);
            }
        };

        fetchBlogs();
    }, [token]);

    const handleDeleteBlog = async () => {
        try {
            console.log('Using token:', token);
            const response = await fetch(BASE_URL + `/blog/${id}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` }
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error('Delete failed:', errorData.message);
                return;
            }

            navigate(-1);
        } catch (error) {
            console.error('Error fetching blogs:', error);
        }
    }

    return (<>
        <h1>blogdetail {id}</h1>
        {blog && (
            <div>
                <h1>title: {blog.title}</h1>
                <p> text: {blog.text}</p>
                <p> author: {blog.username}</p>
                <p>created : {blog.create_date}</p>

                <button onClick={handleDeleteBlog} className="btn btn-error">delete</button>
            </div>
        )}
    </>);
}

export default BlogDetailPage;