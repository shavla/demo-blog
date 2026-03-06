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
        if (!blogData.title.trim() || !blogData.content.trim()) return;
        createBlogMutation.mutate(blogData);
    };

    return (
        <div className="container mx-auto p-8 max-w-4xl">
                <h1 className="text-3xl font-bold mb-6">Create New Blog</h1>
                <div className="flex justify-between items-center mb-5">
                    <p className="text-gray-600">
                        Welcome, {user?.username}! Let's start writing a new story!
                    </p>
                    <button
                        onClick={handleSubmit}
                        disabled={createBlogMutation.isPending || !blogData.title.trim() || !blogData.content.trim()}
                        className="btn btn-sm btn-primary rounded-full px-6 disabled:opacity-50 disabled:cursor-not-allowed ml-3"
                    >
                        {createBlogMutation.isPending ? "Publishing..." : "Publish"}
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        name="title"
                        value={blogData.title}
                        onChange={handleInputChange}
                        required
                        className="w-full text-4xl font-bold border-none outline-none placeholder-gray-300 leading-normal pb-1"
                        placeholder="Title"
                    />
                    <hr />
                    <textarea
                        name="content"
                        value={blogData.content}
                        onChange={handleInputChange}
                        required
                        rows={14}
                        className="w-full text-lg border-none outline-none placeholder-gray-300 resize-none"
                        placeholder="Tell your story..."
                    />
                </form>
        </div>
    );
};

export default CreateBlogPage;