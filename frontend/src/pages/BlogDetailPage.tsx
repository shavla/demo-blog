import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useAuth } from "../customHooks/AuthHook";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getBlog, deleteBlog, createComment, getComments, deleteComment, updateComment } from "../api/userApi";
import { formatDateShort } from "../extensions/extensions";
import CommentField from "../components/comments/CommentField";
import type { DropdownButton } from "../models/types/dropdown.button.type";
import DropDown from "../components/dropdown/Dropdown";

const BlogDetailPage = () => {
    const { id } = useParams<{ id: string }>();
    const { token, user } = useAuth();
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const [showConfirm, setShowConfirm] = useState(false);
    const [resetCommentField, setResetCommentField] = useState(0);

    const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
    const [editingCommentText, setEditingCommentText] = useState<string>("");

    const { data: blog, isLoading, isError, error } = useQuery({
        queryKey: ["blog", id],
        queryFn: () => getBlog(Number(id), token!),
        enabled: !!token && !!id,
    });

    const { data: comments } = useQuery({
        queryKey: ["comments", blog?.blog_id],
        queryFn: () => getComments(blog!.blog_id, token!),
        enabled: !!blog?.blog_id && !!token,
    });

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }, []);

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

    const createCommentMutaion = useMutation({
        mutationFn: (comment: string) =>
            createComment(token!, { text: comment, blogId: blog.blog_id }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["comments", blog!.blog_id] });
            setResetCommentField(prev => prev + 1);
        },
        onError: (error: any) => {
            console.error("Failed to create comment:", error);
            alert(error.message);
        },
    });

    const deleteCommentMutation = useMutation({
        mutationFn: (commentId: number) => deleteComment(commentId, token!),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["comments", blog!.blog_id] });
        },
        onError: (error: any) => {
            console.error("Delete error:", error);
            alert(`Failed to delete comment: ${error.message || "Unknown error"}`);
        }
    })

    const updateCommentMutation = useMutation({
        mutationFn: ({ commentId, text }: { commentId: number; text: string }) =>
            updateComment(commentId, text, token!),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["comments", blog!.blog_id] });
            setEditingCommentId(null);
            setEditingCommentText("");
        },
        onError: (error: any) => {
            console.error("Failed to update comment:", error);
            alert(error.message);
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

    const handleCommentRespond = (comment: string) => {
        createCommentMutaion.mutate(comment)
    }

    const handleDeleteComment = (id: number) => {
        deleteCommentMutation.mutate(id);
    }

    const handleEditComment = (commentId: number, currentText: string) => {
        setEditingCommentId(commentId);
        setEditingCommentText(currentText);
    };

    const getCommentDropdown = (commentId: number, commentText: string): DropdownButton[] => [
        { text: "Edit", textColor: "text-grey-500", onClick: () => handleEditComment(commentId, commentText) },
        { text: "Delete", textColor: "text-red-500", onClick: () => handleDeleteComment(commentId) },
    ];

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
                <p className="text-gray-600 mb-2">Author: <Link to={`/personInfo/${blog.user_id}`}> {blog.username} </Link></p>
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

                <div className="comments mt-12 border-t-2">
                    <p className="text-xl font-semibold my-5">Responses ({comments?.length})</p>

                    {comments?.map((c: any) => (
                        <div key={c.comment_id} className="px-3 pt-3">
                            <div className="logo flex justify-between w-full">
                                <div className="flex items-center">
                                    <div className="logo-img w-8 h-8 bg-slate-500 rounded-full"></div>
                                    <div className="info ml-2">
                                        <Link className="font-semibold" to={`/personInfo/${c.user_id}`}>{c.username}</Link>
                                        <p className="text-xs text-gray-400">{formatDateShort(c.update_date)}</p>
                                    </div>
                                </div>
                                {user?.id === c.user_id && (
                                    <DropDown items={getCommentDropdown(c.comment_id, c.text)} />
                                )}
                            </div>

                            {editingCommentId === c.comment_id ? (
                                <div className="flex gap-2 mt-1">
                                    <input
                                        type="text"
                                        className="input input-bordered flex-1"
                                        value={editingCommentText}
                                        onChange={(e) => setEditingCommentText(e.target.value)} />
                                    <button className="btn btn-primary"
                                        onClick={() => updateCommentMutation.mutate({ commentId: c.comment_id, text: editingCommentText })}>
                                        Save
                                    </button>
                                    <button className="btn btn-secondary"
                                        onClick={() => setEditingCommentId(null)}>
                                        Cancel
                                    </button>
                                </div>
                            ) : (
                                <p className="text-sm pt-1">{c.text}</p>
                            )}
                        </div>
                    ))}
                </div>
                <div className="mt-10">
                    <CommentField callback={handleCommentRespond} resetSignal={resetCommentField}></CommentField>
                </div>
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