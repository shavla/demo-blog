import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../customHooks/AuthHook";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getBlog, deleteBlog } from "../api/userApi";
import { formatDateShort } from "../extensions/extensions";

const BlogDetailPage = () => {
    const { id } = useParams<{ id: string }>();
    const { token, user } = useAuth();
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const [showConfirm, setShowConfirm] = useState(false);

    const { data: blog, isLoading, isError, error } = useQuery({
        queryKey: ["blog", id],
        queryFn: () => getBlog(Number(id), token!),
        enabled: !!token && !!id,
    });

    const deleteMutation = useMutation({
        mutationFn: () => deleteBlog(Number(id), token!),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["profile"] });
            navigate(-1);
        },
        onError: (error: any) => {
            console.error("Delete error:", error);
            alert(`Failed to delete blog: ${error.message || "Unknown error"}`);
        },
    });

    const handleDeleteClick = () => {
        setShowConfirm(true);
    };

    const confirmDelete = () => {
        deleteMutation.mutate();
        setShowConfirm(false);
    };

    const cancelDelete = () => {
        setShowConfirm(false);
    };

    if (isLoading) {
        return (
            <div className="container mx-auto px-4 py-8 max-w-3xl">
                <p>Loading blog...</p>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="container mx-auto px-4 py-8 max-w-3xl">
                <p className="text-red-500">Error loading blog: {error?.message || "Unknown error"}</p>
                <button onClick={() => navigate(-1)} className="btn btn-primary mt-4">
                    Go Back
                </button>
            </div>
        );
    }

    if (!blog) {
        return (
            <div className="container mx-auto px-4 py-8 max-w-3xl">
                <p>Blog not found</p>
                <button onClick={() => navigate(-1)} className="btn btn-primary mt-4">
                    Go Back
                </button>
            </div>
        );
    }

    const isAuthor = user?.id === blog.user_id;

    return (
        <>
            <div className="container mx-auto p-8 max-w-5xl">
                <h1 className="text-4xl font-bold mb-4">{blog.title}</h1>
                <p className="text-gray-600 mb-2">Author: {blog.username}</p>
                <p className="text-gray-500 mb-6">
                    Created: {formatDateShort(blog.create_date)}
                </p>
                <div className="prose max-w-none mb-6 whitespace-pre-wrap">{blog.text}</div>

                {isAuthor && (
                    <div className="flex gap-2">
                        <button className="btn btn-primary" onClick={() => navigate(`/editBlog/${blog.blog_id}`)}>
                            Edit Blog
                        </button>
                        <button className="btn btn-error" onClick={handleDeleteClick} disabled={deleteMutation.isPending} >
                            Delete Blog
                        </button>
                    </div>
                )}

                {deleteMutation.isError && (
                    <p className="text-red-500 mt-4">
                        Error: {deleteMutation.error?.message || "Failed to delete"}
                    </p>
                )}
            </div>

            {showConfirm && (
                <dialog className="modal modal-open">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg">Delete Blog</h3>
                        <p className="py-4">
                            Are you sure you want to delete <span className="font-semibold">{blog.title}</span>?
                        </p>
                        <div className="modal-action">
                            <button className="btn" onClick={cancelDelete} disabled={deleteMutation.isPending} >
                                Cancel
                            </button>
                            <button className="btn btn-error" onClick={confirmDelete} disabled={deleteMutation.isPending} >
                                {deleteMutation.isPending ? "Deleting..." : "Delete"}
                            </button>
                        </div>
                    </div>
                    <div className="modal-backdrop" onClick={cancelDelete} />
                </dialog>
            )}
        </>
    );
};

export default BlogDetailPage;