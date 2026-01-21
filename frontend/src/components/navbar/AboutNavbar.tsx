import { Link } from "react-router-dom";
import Logo from "./Logo";

const AboutNavbar = ({ username }: { username?: string }) => {

    return (
        <nav className="flex justify-between items-center h-20 border-b border-white bg-navbar-secondary px-5">
            <Logo></Logo>
            {username ? <></> : <div>
                <Link to={"/login"} className="text-white text-opacity-90 bg-navbar-secondary rounded-full border border-white/85 border-opacity-90 px-4 py-2 mr-4">Sign in</Link>
                <Link to={"/register"} className="text-black bg-white bg-opacity-90 rounded-full px-4 py-2" >Sign up</Link>
            </div>}
        </nav>
    )
}

export default AboutNavbar;