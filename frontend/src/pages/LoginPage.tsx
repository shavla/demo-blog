import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../customHooks/AuthHook";
import { BASE_URL } from "../utils/consts";
import image from "../assets/register_img.png";

const LoginPage = () => {
    const navigate = useNavigate();
    const { login } = useAuth();

    const [userInfo, setUserInfo] = useState({
        email: "",
        password: ""
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUserInfo((values) => ({
            ...values,
            [name]: value
        }));
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await fetch(BASE_URL + '/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userInfo)
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Registration successful:', data);

                setUserInfo({ email: "", password: "" });
                login(data.user, data.token);
                // localStorage.setItem('token', data.token);
                navigate("/");
            } else {
                const errorData = await response.json();
                console.log('login failed:', errorData.message); // Will log "not good email"
                // TODO create popup

                // console.error('Registration failed:', response);
            }
        } catch (error) {
            console.error('Error during registration:', error);
        }
    }

    return (<div className="h-[calc(100vh_-_64px)] flex items-center justify-center bg-primary">
        <div className="absolute right-0 h-1/2 z-0 md:h-4/5">
            <img className="w-full h-full object-contain" src={image} alt="register image" />
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col items-center z-10">
            <div className="mb-4 w-80">
                <label className="input validator">
                    <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <g
                            strokeLinejoin="round"
                            strokeLinecap="round"
                            strokeWidth={2.5}
                            fill="none"
                            stroke="currentColor"
                        >
                            <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                        </g>
                    </svg>
                    <input
                        // type="email"
                        placeholder="mail@site.com"
                        required
                        name="email"
                        value={userInfo.email} onChange={handleInputChange} />
                </label>
                <div className="validator-hint">Enter valid email address </div>
            </div>
            <div className="pt-0.5 w-80">
                <label className="input validator">
                    <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <g
                            strokeLinejoin="round"
                            strokeLinecap="round"
                            strokeWidth={2.5}
                            fill="none"
                            stroke="currentColor"
                        >
                            <path
                                d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"
                            ></path>
                            <circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle>
                        </g>
                    </svg>
                    <input
                        // type="password"
                        // minLength={8}
                        required
                        placeholder="Password"
                        name="password" value={userInfo.password} onChange={handleInputChange}
                    />
                </label>
            </div>
            <button className="btn btn-neutral w-40 mt-[5.15rem]" type="submit">Log In</button>
            <div className="mt-3">No account? <Link to={"/register"} className="underline text-gray-400 hover:text-gray-700">Create one</Link> </div>
        </form>
    </div>);
}

export default LoginPage;