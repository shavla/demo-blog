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

    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
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
        setIsSubmitting(true);

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
        } finally {
            setIsSubmitting(false);
        }
    };

    if (loading) return <p>Loading blog...</p>;

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-2xl mx-auto">
                <h2 className="text-3xl font-bold mb-6">Edit Blog</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                            Blog Title:
                        </label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            required
                            className="input input-bordered w-full"
                            placeholder="Enter blog title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
                            Content
                        </label>
                        <textarea
                            id="content"
                            name="content"
                            required
                            rows={10}
                            className="textarea textarea-bordered w-full"
                            placeholder="Write your blog content here..."
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="btn btn-primary w-full"
                    >
                        {isSubmitting ? 'Updating...' : 'Update Blog'}
                    </button>
                </form>
            </div>

        </div>
    );
};

export default EditBlog;