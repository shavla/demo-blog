import { useAuth } from "../../customHooks/AuthHook";
import { useLocation } from "react-router-dom";
import UnauthenticatedNavbar from "./UnauthenticatedNavbar";
import AuthenticatedNavbar from "./AuthenticatedNavbar";

const Navbar = () => {
    const location = useLocation();
    const { user, isAuthenticated, loading } = useAuth();
    const hiddenRoutes = ['/about'];
    const isHidden = hiddenRoutes.includes(location.pathname);

    return (<>
        {isAuthenticated ? (
            <AuthenticatedNavbar username={user?.username} ></AuthenticatedNavbar>
        ) : <UnauthenticatedNavbar></UnauthenticatedNavbar>}
    </>);
}

export default Navbar;
