import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../customHooks/AuthHook";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getBlog, updateBlog } from "../api/userApi";

const EditBlog = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { token } = useAuth();
    const queryClient = useQueryClient();

    const [title, setTitle] = useState("");
    const [text, setText] = useState("");

    const { data: blog, isLoading, isError } = useQuery({
        queryKey: ["blog", id],
        queryFn: () => getBlog(Number(id), token!),
        enabled: Boolean(token),
    });

    useEffect(() => {
        if (blog) {
            setTitle(blog.title ?? "");
            setText(blog.text ?? "");
        }
    }, [blog]);

    const updateMutation = useMutation({
        mutationFn: (updatedBlog: { title: string; text: string }) =>
            updateBlog(Number(id), token!, updatedBlog),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["blog", id] });
            navigate(-1);
        },
        onError: (error: any) => {
            alert(`Failed to update blog: ${error.message}`);
        },
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim() || !text.trim()) return;
        updateMutation.mutate({ title, text });
    };

    if (isLoading) return <p className="p-8">Loading blog...</p>;
    if (isError) return <p className="p-8 text-red-500">Error loading blog</p>;

    return (
        <div className="container mx-auto p-8 max-w-4xl">
            <h1 className="text-3xl font-bold mb-6">Edit Blog</h1>
            <div className="flex justify-between items-center mb-5">
                <p className="text-gray-600">Make your changes below.</p>
                <button
                    onClick={handleSubmit}
                    disabled={updateMutation.isPending || !title.trim() || !text.trim()}
                    className="btn btn-sm btn-primary rounded-full px-6 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {updateMutation.isPending ? "Saving..." : "Save Changes"}
                </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    className="w-full text-4xl font-bold border-none outline-none placeholder-gray-300 leading-normal pb-1"
                    placeholder="Title"
                />
                <hr />
                <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    required
                    rows={14}
                    className="w-full text-lg border-none outline-none placeholder-gray-300 resize-none"
                    placeholder="Tell your story..."
                />
            </form>
        </div>
    );
};

export default EditBlog;