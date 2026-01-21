import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../customHooks/AuthHook";
import image from "../assets/register_img.png";
import { useQuery } from "@tanstack/react-query";
import { getPaginatedBlogs } from "../api/userApi";
import Pagination from "../components/pagination/Pagination";
import type { BlogInfoType } from "../models/types/blog.type";
import BlogInfo from "../components/blogsDetails/BlogInfo";

const HomePage = () => {
    const { token, isAuthenticated } = useAuth();

    const [page, setPage] = useState(1);

    const { data, isLoading, error } = useQuery({
        queryKey: ['blogs', page],
        queryFn: () => getPaginatedBlogs(page, token!),
        enabled: !!token
    });

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }, [page]);

    console.log(data)

    if (!isAuthenticated) {
        return (<>
            <div className="bg-primary h-[calc(100vh-80px)] flex items-center relative overflow-hidden">
                <div className="absolute right-0 h-1/2 z-0 md:h-4/5">
                    <img className="w-full h-full object-contain" src={image} alt="register image" />
                </div>
                <div className="w-full max-w-4xl ml-12 lg:mx-auto z-10">
                    <h1 className="font-bold text-7xl md:text-8xl">Human<br />stories & ideas</h1>
                    <p className="font-light text-2xl mt-4">A place to read, write, and deepen your understanding</p>
                    <Link className="inline-block text-lg mt-8 bg-green-700 text-green-50 rounded-full px-8 py-2 md:bg-slate-950"
                        to="/login">Start reading</Link>
                </div>
            </div>
        </>)
    }
    
    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-[60vh]">
                <p className="text-lg">Loading blogs...</p>
            </div>
        );
    }

    return (<>
        <h1 className="mt-8 mb-10 text-center text-xl">For You</h1>
        <div className="blog-list max-w-5xl mx-auto px-10 py-5 grid grid-cols-1 gap-5 md:grid-cols-2">
            {data?.blogs.map((blog: BlogInfoType) => (
                <BlogInfo key={blog.blog_id} blogInfo={blog}></BlogInfo>
            ))}
        </div>
        <div className="pagination mt-10 mb-28">
            <Pagination
                currentPage={page}
                totalPages={data?.totalPages}
                onPageChange={setPage}
            />
        </div>

    </>);
}

export default HomePage;