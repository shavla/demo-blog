import { useAuth } from "../../customHooks/AuthHook";
import { useLocation } from "react-router-dom";
import UnauthenticatedNavbar from "./UnauthenticatedNavbar";
import AuthenticatedNavbar from "./AuthenticatedNavbar";
import AboutNavbar from "./AboutNavbar";

const Navbar = () => {
    const location = useLocation();
    const { user, isAuthenticated } = useAuth();
    const aboutRoutes = ["/about"];
    const isAboutPage = aboutRoutes.includes(location.pathname);

    if (isAboutPage) {
        return <AboutNavbar  username={user?.username}/>;
    }

    if (isAuthenticated) {
        return <AuthenticatedNavbar username={user?.username} userId={user?.id}/>;
    }

    return <UnauthenticatedNavbar />;
}

export default Navbar;
