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

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        updateMutation.mutate({ title, text });
    };

    if (isLoading) return <p>Loading blog...</p>;
    if (isError) return <p>Error loading blog</p>;

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-2xl mx-auto">
                <h2 className="text-3xl font-bold mb-6">Edit Blog</h2>

                <form onSubmit={handleSubmit} className="space-y-6">

                    <div>
                        <label className="block text-sm font-medium mb-2">
                            Blog Title
                        </label>
                        <input
                            type="text"
                            className="input input-bordered w-full"
                            required
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">
                            Content
                        </label>
                        <textarea
                            className="textarea textarea-bordered w-full"
                            rows={10}
                            required
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={updateMutation.isPending}
                        className="btn btn-primary w-full"
                    >
                        {updateMutation.isPending ? "Updating..." : "Update Blog"}
                    </button>

                </form>
            </div>
        </div>
    );
};

export default EditBlog;