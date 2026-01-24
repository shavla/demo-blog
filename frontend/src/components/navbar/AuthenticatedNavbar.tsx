import { Search, SquarePen } from "lucide-react";
import Logo from "./Logo";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../customHooks/AuthHook";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "../../customHooks/useDebounceHook";
import { searchBlogs } from "../../api/userApi";

const AuthenticatedNavbar = ({ username, userId }: { username?: string; userId?: number }) => {
    const { logout, token } = useAuth();
    const [search, setSearch] = useState("");
    const [open, setOpen] = useState(false);

    const navigate = useNavigate();
    const debouncedSearch = useDebounce(search, 500);

    const { data, isLoading } = useQuery({
        queryKey: ["search", debouncedSearch],
        queryFn: () => searchBlogs(debouncedSearch, token!),
        enabled: !!debouncedSearch.trim(),
        staleTime: 1000 * 30,
    });

    const handleLogout = () => {
        navigate("/");
        logout();
    }

    return (
        <nav className="h-20 flex items-center justify-around">
            <div className="flex md:hidden p-2 bg-green-700 rounded-lg text-white font-bold">
                <Link to={"/"}>
                    B
                </Link>
            </div>
            <div className="flex items-center relative">
                <div className="logo hidden md:flex">
                    <Logo />
                </div>
                <div className="relative md:ml-6">
                    <div className="flex items-center gap-2 max-w-64 h-9 px-3 rounded-full bg-gray-50">
                        <Search className="text-gray-400 text-sm" />
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            onFocus={() => setOpen(true)}
                            onBlur={() => setTimeout(() => setOpen(false), 150)}
                            placeholder="Search"
                            className="w-full bg-transparent text-sm outline-none"
                        />
                    </div>
                    {open && debouncedSearch && (
                        <div className="absolute top-11 w-64 bg-white shadow-lg rounded-md z-50 max-h-60 overflow-y-auto">
                            {isLoading && (
                                <div className="h-12 p-3 text-sm text-gray-400">
                                    Searching...
                                </div>
                            )}

                            {!isLoading && data?.length === 0 && (
                                <div className="h-12 flex items-center p-3 text-sm text-gray-400">
                                    No results found
                                </div>
                            )}

                            {!isLoading &&
                                data?.map((item: any) => (
                                    <Link
                                        key={item.blog_id}
                                        to={`/blogDetail/${item.blog_id}`}
                                        className="flex items-center px-3 h-12 text-sm hover:bg-gray-100"
                                    >
                                        <span className="truncate w-full">
                                            {item.title}
                                        </span>
                                    </Link>
                                ))}
                        </div>
                    )}
                </div>
            </div>

            <div className="flex gap-4 text-gray-500">
                <Link to="/createBlog" className="hidden md:flex">
                    <SquarePen className="mr-2" /> Write
                </Link>

                <div className="dropdown dropdown-end">
                    <div tabIndex={0} className="cursor-pointer">{username}</div>
                    <ul className="dropdown-content menu bg-base-100 rounded-box w-52 p-2 shadow-lg mt-3">
                        <li>
                            <Link to={`/personInfo/${userId}`}>View Profile</Link>
                            <Link to="/createBlog" className="flex md:hidden">Write</Link>
                        </li>
                        <button onClick={handleLogout} className="btn btn-primary">
                            Sign out
                        </button>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default AuthenticatedNavbar;