import { useNavigate } from "react-router-dom";
import { formatDateShort } from "../../extensions/extensions";
import type { BlogInfo } from "./PersonBlogCard";

const BlogCard = ({ data }: { data: BlogInfo }) => {
    const navigate = useNavigate();

    const handleBlogClick = () => {
        navigate(`/blogDetail/${data.blog_id}`);
    }

    return (
        <>
            <div className="person-blog relative w-full cursor-pointer" onClick={handleBlogClick}>
                <h1 className="text-2xl font-bold">{data.title}</h1>
                <p className="line-clamp-2">{data.text}</p>
                <div className="flex justify-between items-center">
                    <p>{formatDateShort(data.create_date)}</p>
                </div>
            </div>
        </>
    );
};

export default BlogCard;
