import { useParams } from "react-router-dom";
import { deleteBlog, fetchUserInfo } from "../api/userApi";
import { useAuth } from "../customHooks/AuthHook";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { BlogInfo } from "../components/blogsDetails/PersonBlogCard";
import BlogCard from "../components/blogsDetails/BlogCard";
import PersonBlogCard from "../components/blogsDetails/PersonBlogCard";
import type { UserType } from "../models/types/user.type";
import { getAvatar } from "../utils/avatar";

const PersonInfoPage = () => {
    const { id } = useParams<{ id: string }>();
    const { token, user } = useAuth();
    const queryClient = useQueryClient();

    const { data, isLoading, isError, error } = useQuery<UserType>({
        queryKey: ["profile", token ,id],
        queryFn: () => fetchUserInfo(token!, Number(id)),
        enabled: Boolean(token && id),
    });

    console.log(data)


    // Delete mutation
    const deleteMutation = useMutation({
        mutationFn: (blogId: number) => deleteBlog(blogId, token!),
        onSuccess: () => {
            // Refetch the profile data to get updated blogs list
            queryClient.invalidateQueries({ queryKey: ["profile", token, id] });
        },
        onError: (error: any) => {
            console.error("Delete failed:", error.message);
            alert(`Failed to delete blog: ${error.message}`);
        },
    });

    const handleDelete = (blogId: number) => {
        deleteMutation.mutate(blogId);
    };

    if (isLoading) return <div className="text-center mt-10">Loading...</div>;
    if (isError) return <div className="text-center mt-10 text-red-500">Error: {error?.message}</div>;

    const blogs = data?.blogs ?? [];
    const isAuthor = user?.id === data?.id;

    console.log(data)

    return (
        <div className="flex flex-col items-center">
            <div className="user-info my-5 flex flex-col items-center">
                <img  src={getAvatar(data?.avatar)} alt="avatar" className="w-24 h-24 rounded-full mb-3" />
                <h1 className="text-4xl font-bold">{data?.username}</h1>
            </div>

            <div className="blogs max-w-2xl w-full p-7 flex flex-col items-center gap-8 md:w-3/4">
                {blogs.length === 0 ? (
                    <p>No blogs yet</p>
                ) : (
                    blogs.map((blog: BlogInfo) => (
                        isAuthor ? (
                            <PersonBlogCard
                                key={blog.blog_id}
                                data={blog}
                                onDelete={handleDelete}
                                isDeleting={deleteMutation.isPending}
                            />
                        ) :
                         (
                            <BlogCard
                                key={blog.blog_id}
                                data={blog}
                            />
                        )
                    ))
                )}
            </div>
        </div>
    );
}

export default PersonInfoPage;