import { useAuth } from "../customHooks/AuthHook";
import logo from '../assets/logo.png';
import { Link } from "react-router-dom";
import { Bell, Search, SquarePen } from "lucide-react";

const Navbar = () => {
    const { user, token, isAuthenticated } = useAuth();

    return (<>
        {isAuthenticated ? (
            <div className="h-12 flex items-center justify-around">
                <div className="flex">
                    <div className="logo w-28">
                        <Link to={"/"}><img src={logo} alt="Logo" /></Link>
                    </div>
                    <div className="flex ml-3">
                        <Search></Search>
                        <input type="search" required placeholder="Search" />
                    </div>
                </div>
                <div className="flex gap-4 text-[#6B6B6B]">
                    <Link to={"/createBlog"} className="flex"><SquarePen className="mr-2"></SquarePen> Write</Link>
                    <Link to={"/createBlog"}><Bell></Bell></Link>
                    <Link to={"/userPage"}>{user?.username}</Link>
                </div>
            </div>
        ) : (
            <div className="flex justify-evenly items-center h-16 border-b border-black bg-[#F7F4ED]">
                <div className="logo w-32"><img src={logo} alt="Logo" /></div>
                <div className="flex items-center gap-4">
                    <Link to={"/about"}>Our story</Link>
                    <Link to={"/createBlog"}>Write</Link>
                    <Link to={"/login"}>Sign in</Link>
                    <Link className="bg-slate-950 text-green-50 rounded-full px-2 py-1" to={"/register"}>Get started</Link>
                </div>
            </div>
        )}
    </>);
}

export default Navbar;
