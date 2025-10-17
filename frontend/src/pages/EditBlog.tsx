import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../customHooks/AuthHook';
import { BASE_URL } from '../utils/consts';

const EditBlog = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { token } = useAuth();


    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch existing blog data
        if (!token) return;

        const fetchBlog = async () => {
            try {
                const response = await fetch(BASE_URL + `/blog/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                const data = await response.json();
                setTitle(data.title);
                setText(data.text);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching blog:', error);
            }
        };

        fetchBlog();
    }, [token]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
           const response = await fetch(BASE_URL + `/blog/${id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ title, text })
          });

          if (response.ok) {
            navigate(-1); // Go back after successful edit
          } else {
            const err = await response.json();
            console.error('Update failed:', err.message);
          }
        } catch (error) {
          console.error('Error updating blog:', error);
        }
    };

    if (loading) return <p>Loading blog...</p>;

    return (
        <div>
            <h2>Edit Blog</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Title:</label><br />
                    <input value={title} onChange={(e) => setTitle(e.target.value)} required />
                </div>
                <div>
                    <label>Text:</label><br />
                    <textarea value={text} onChange={(e) => setText(e.target.value)} required />
                </div>
                <button type="submit">Update Blog</button>
            </form>
        </div>
    );
};

export default EditBlog;