import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png';

const Logo = () => {
    return (
        <div className="logo w-36">
            <Link to={"/"}>
                <img src={logo} alt="Logo" />
            </Link>
        </div>
    );
}

export default Logo;