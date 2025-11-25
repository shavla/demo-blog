import React, { useState } from "react";
import { useAuth } from "../customHooks/AuthHook";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createBlog } from "../api/userApi";

const CreateBlogPage: React.FC = () => {
    const navigate = useNavigate();
    const { user, token } = useAuth();
    const queryClient = useQueryClient();

    const [blogData, setBlogData] = useState({ title: "", content: "" });

    const createBlogMutation = useMutation({
        mutationFn: (data: { title: string; content: string }) =>
            createBlog(token!, data),
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["profile", token] });
            setBlogData({ title: "", content: "" });
            navigate(`/personInfo/${user?.id}`);
        },
        onError: (error: any) => {
            console.error("Failed to create blog:", error.message);
            alert(`Failed to create blog: ${error.message}`);
        },
    });

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setBlogData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        createBlogMutation.mutate(blogData);
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-2xl mx-auto">
                <h1 className="text-3xl font-bold mb-6">Create New Blog Post</h1>
                <p className="text-gray-600 mb-8">
                    Welcome, {user?.username}! Let's start writing a new story!
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Blog Title
                        </label>
                        <input
                            type="text"
                            name="title"
                            value={blogData.title}
                            onChange={handleInputChange}
                            required
                            className="input input-bordered w-full"
                            placeholder="Enter blog title"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Content
                        </label>
                        <textarea
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
                        disabled={createBlogMutation.isPending}
                        className="btn btn-primary w-full"
                    >
                        {createBlogMutation.isPending
                            ? "Creating..."
                            : "Create Blog Post"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateBlogPage;