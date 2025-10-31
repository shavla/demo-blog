import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png';

const Logo = ({ size }: { size?: number }) => {
    return (
        <div className="logo" style={{ width: size ? `${size * 0.25}rem` : '9rem' }}>
            <Link to={"/"}>
                <img src={logo} alt="logo" />
            </Link>
        </div>
    );
}

export default Logo;