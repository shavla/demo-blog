import React, { useState } from 'react';
import { useAuth } from '../customHooks/AuthHook';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/consts';

const CreateBlogPage: React.FC = () => {
    const navigate = useNavigate();
    const { user, token } = useAuth();
    const [blogData, setBlogData] = useState({
        title: '',
        content: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setBlogData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const response = await fetch(BASE_URL + '/createblog', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(blogData)
            });

            if (response.ok) {
                const result = await response.json();
                console.log('Blog created:', result);
                setBlogData({ title: '', content: '' });
                navigate("/userinfo")
                // alert('Blog created successfully!');
            } else {
                const error = await response.json();
                console.log(error.message || 'Failed to create blog');
            }
        } catch (error) {
            console.error('Error creating blog:', error);
            //   alert('Network error. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-2xl mx-auto">
                <h1 className="text-3xl font-bold mb-6">Create New Blog Post</h1>
                <p className="text-gray-600 mb-8">
                    Welcome, {user?.username}! This is a protected page - you needed to log in to access it.
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                            Blog Title
                        </label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={blogData.title}
                            onChange={handleInputChange}
                            required
                            className="input input-bordered w-full"
                            placeholder="Enter blog title"
                        />
                    </div>
                    {/* 
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>
            <select
              id="category"
              name="category"
              value={blogData.category}
              onChange={handleInputChange}
              required
              className="select select-bordered w-full"
            >
              <option value="">Select a category</option>
              <option value="technology">Technology</option>
              <option value="lifestyle">Lifestyle</option>
              <option value="travel">Travel</option>
              <option value="food">Food</option>
            </select>
          </div> */}

                    <div>
                        <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
                            Content
                        </label>
                        <textarea
                            id="content"
                            name="content"
                            value={blogData.content}
                            onChange={handleInputChange}
                            required
                            rows={10}
                            className="textarea textarea-bordered w-full"
                            placeholder="Write your blog content here..."
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="btn btn-primary w-full"
                    >
                        {isSubmitting ? 'Creating...' : 'Create Blog Post'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateBlogPage;