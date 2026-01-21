import { Link } from "react-router-dom";
import Logo from "./Logo";

const UnauthenticatedNavbar = () => {
    return (
        <nav className="flex justify-evenly items-center h-20 border-b border-black bg-primary">
            <Logo></Logo>
            <div className="flex gap-4">
                <div className="hidden items-center gap-4 sm:flex">
                    <Link to={"/about"}>Our story</Link>
                    <Link to={"/createBlog"}>Write</Link>
                    <Link to={"/login"}>Sign in</Link>
                </div>
                <Link className="bg-slate-950 text-green-50 rounded-full px-2 py-1" to={"/register"}>Get started</Link>
            </div>
        </nav>
    );
}

export default UnauthenticatedNavbar;