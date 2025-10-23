import { Link } from "react-router-dom";
import Logo from "./Logo";

const UnauthenticatedNavbar = () => {
    return (
        <nav className="flex justify-evenly items-center h-16 border-b border-black bg-primary">
            <Logo></Logo>
            <div className="flex items-center gap-4">
                <Link to={"/about"}>Our story</Link>
                <Link to={"/createBlog"}>Write</Link>
                <Link to={"/login"}>Sign in</Link>
                <Link className="bg-slate-950 text-green-50 rounded-full px-2 py-1" to={"/register"}>Get started</Link>
            </div>
        </nav>
    );
}

export default UnauthenticatedNavbar;