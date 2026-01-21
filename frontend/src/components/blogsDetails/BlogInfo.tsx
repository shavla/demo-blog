import { Link } from "react-router-dom";
import type { BlogInfoType } from "../../models/types/blog.type";
import { formatDateLong } from "../../extensions/extensions";

const BlogInfo = ({ blogInfo }: { blogInfo: BlogInfoType }) => {
    return (<>
        <div key={blogInfo.blog_id} className="blog-card h-56 bg-slate-50 rounded-2xl border-2 border-slate-200 pt-8 px-8 pb-10">
            <div className="flex flex-col justify-between h-full">
                <div>
                    <Link to={`/blogDetail/${blogInfo.blog_id}`} className="card-title text-blue-950 font-bold text-xl hover:text-blue-600 transition-colors duration-300 mb-2 line-clamp-3 cursor-pointer">{blogInfo.title}</Link>
                    <h3 className="card-date text-blue-950 text-sm">{formatDateLong(blogInfo.update_date)}</h3>
                </div>
                <div>
                    <Link to={`/blogDetail/${blogInfo.blog_id}`} className="text-blue-950 font-medium relative inline-block
                              after:absolute after:left-0 after:-bottom-1
                              after:h-[2px] after:w-full
                              after:origin-left after:scale-x-0
                              after:bg-[#000c2a]
                              after:transition-transform after:duration-300
                              hover:after:scale-x-100 cursor-pointer">View →</Link>
                </div>
            </div>
        </div>
    </>);
}

export default BlogInfo;