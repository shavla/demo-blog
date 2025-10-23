import { Bell, Search, SquarePen } from "lucide-react";
import Logo from "./Logo";
import { Link } from "react-router-dom";

const AuthenticatedNavbar = ({ username }: { username?: string }) => {
    return (
        <div className="h-12 flex items-center justify-around">
            <div className="flex">
                <Logo></Logo>
                <div className="flex ml-3">
                    <Search></Search>
                    <input type="search" required placeholder="Search" />
                </div>
            </div>
            <div className="flex gap-4 text-[#6B6B6B]">
                <Link to={"/createBlog"} className="flex"><SquarePen className="mr-2"></SquarePen> Write</Link>
                <Link to={"/createBlog"}><Bell></Bell></Link>
                <Link to={"/userPage"}>{username}</Link>
            </div>
        </div>
    );
}

export default AuthenticatedNavbar;