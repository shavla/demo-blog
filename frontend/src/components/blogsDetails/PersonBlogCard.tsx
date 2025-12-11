import { useState } from "react";
import { formatDateShort } from "../../extensions/extensions";
import { useNavigate } from "react-router-dom";
import DropDown from "../dropdown/Dropdown";
import type { DropdownButton } from "../../models/types/dropdown.button.type";

type PersonBlogCardProps = {
    data: BlogInfo;
    onDelete: (blogId: number) => void;
    isDeleting?: boolean;
};

const PersonBlogCard = ({ data, onDelete, isDeleting = false }: PersonBlogCardProps) => {
    const navigate = useNavigate();
    const [showConfirm, setShowConfirm] = useState(false);

    const handleBlogClick = () => {
        navigate(`/blogDetail/${data.blog_id}`);
    };

    const handleEdit = () => {
        navigate(`/editBlog/${data.blog_id}`);
    };

    const handleDelete = () => {
        setShowConfirm(true);
    };

    const confirmDelete = () => {
        onDelete(data.blog_id);
        setShowConfirm(false);
    };

    const cancelDelete = () => {
        setShowConfirm(false);
    };

    const dropdownButtons: DropdownButton[] = [
        { text: "Edit Story", textColor: "text-grey-500", onClick: handleEdit },
        { text: "Delete", textColor: "text-red-500", onClick: handleDelete }
    ]

    return (
        <>
            <div className="person-blog relative w-full cursor-pointer" onClick={handleBlogClick}>
                <h1 className="text-2xl font-bold">{data.title}</h1>
                <p className="line-clamp-2">{data.text}</p>
                <div className="flex justify-between items-center">
                    <p>{formatDateShort(data.create_date)}</p>
                    <div className="relative">
                        <DropDown items={dropdownButtons}></DropDown>
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