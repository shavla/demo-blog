import { useState, useEffect, useRef } from "react";
import { formatDateShort } from "../../extensions/extensions";
import { useNavigate } from "react-router-dom";

type PersonBlogCardProps = {
    data: BlogInfo;
    onDelete: (blogId: number) => void;
    isDeleting?: boolean;
};

const PersonBlogCard = ({ data, onDelete, isDeleting = false }: PersonBlogCardProps) => {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleBlogClick = () => {
        navigate(`/blogDetail/${data.blog_id}`);
    };

    const handleDropdownClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        setOpen((prev) => !prev);
    };

    const handleEdit = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.stopPropagation();
        navigate(`/editBlog/${data.blog_id}`);
        setOpen(false);
    };

    const handleDelete = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.stopPropagation();
        setShowConfirm(true);
        setOpen(false);
    };

    const confirmDelete = () => {
        onDelete(data.blog_id);
        setShowConfirm(false);
    };

    const cancelDelete = () => {
        setShowConfirm(false);
    };

    return (
        <>
            <div className="person-blog relative w-full cursor-pointer" onClick={handleBlogClick}>
                <h1 className="text-2xl font-bold">{data.title}</h1>
                <p className="line-clamp-2">{data.text}</p>
                <div className="flex justify-between items-center">
                    <p>{formatDateShort(data.create_date)}</p>
                    <div className="relative" ref={dropdownRef}>
                        <button className="btn m-1 bg-transparent border-none w-auto h-auto" onClick={handleDropdownClick}>
                            ...
                        </button>
                        {open && (
                            <ul className="menu dropdown-content bg-base-100 rounded-box z-10 w-52 p-2 shadow-sm absolute right-0 top-full">
                                <li>
                                    <a onClick={handleEdit}>Edit Story</a>
                                </li>
                                <li>
                                    <a onClick={handleDelete} className="text-red-500">
                                        Delete
                                    </a>
                                </li>
                            </ul>
                        )}
                    </div>
                </div>
            </div>

            {showConfirm && (
                <dialog className="modal modal-open">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg">Delete Blog</h3>
                        <p className="py-4">
                            Are you sure you want to delete{" "}
                            <span className="font-semibold">{data.title}</span>?
                        </p>
                        <div className="modal-action">
                            <button
                                className="btn"
                                onClick={cancelDelete}
                                disabled={isDeleting}
                            >
                                Cancel
                            </button>
                            <button
                                className="btn btn-error"
                                onClick={confirmDelete}
                                disabled={isDeleting}
                            >
                                {isDeleting ? "Deleting..." : "Delete"}
                            </button>
                        </div>
                    </div>
                    <div className="modal-backdrop" onClick={cancelDelete} />
                </dialog>
            )}
        </>
    );
};

export default PersonBlogCard;

export type BlogInfo = {
    blog_id: number;
    user_id: number;
    create_date: string;
    text: string;
    title: string;
};