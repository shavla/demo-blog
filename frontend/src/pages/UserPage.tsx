import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../customHooks/AuthHook";
import { fetchUserProfile, deleteBlog } from "../api/userApi";
import PersonBlogCard, { type BlogInfo } from "../components/blogsDetails/PersonBlogCard";

const UserPage = () => {
    const { token, user } = useAuth();
    const queryClient = useQueryClient();

    // Fetch user profile
    const { data, error, isLoading, isError } = useQuery({
        queryKey: ["profile", token],
        queryFn: () => token ? fetchUserProfile(token) : Promise.resolve(null),
        enabled: !!token,
    });

    // Delete mutation
    const deleteMutation = useMutation({
        mutationFn: (blogId: number) => deleteBlog(blogId, token!),
        onSuccess: () => {
            // Refetch the profile data to get updated blogs list
            queryClient.invalidateQueries({ queryKey: ["profile", token] });
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

    const blogs = data?.blogs || [];
    console.log(data)

    return (
        <div className="flex flex-col items-center">
            <div className="user-info my-5">
                <h1 className="text-4xl font-bold">{user?.username}</h1>
            </div>

            <div className="blogs max-w-xl w-3/4 p-7 flex flex-col items-center gap-8">
                {blogs.length === 0 ? (
                    <p>No blogs yet</p>
                ) : (
                    blogs.map((blog: BlogInfo) => (
                        <PersonBlogCard
                            key={blog.blog_id}
                            data={blog}
                            onDelete={handleDelete}
                            isDeleting={deleteMutation.isPending}
                        />
                    ))
                )}
            </div>
        </div>
    );
};

export default UserPage;