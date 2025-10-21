import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/consts";
import image from "../assets/register_img.png";

const RegisterPage = () => {
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState({
        userName: "",
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
        console.log(userInfo)

        try {
            const response = await fetch(BASE_URL + '/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userInfo)
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Registration successful:', data);

                localStorage.setItem('token', data.token);
                setUserInfo({ userName: "", email: "", password: "" });
                navigate("/")
            } else {
                const errorData = await response.json();
                console.log('Registration failed:', errorData.message); // Will log "Email already exists"
                // TODO create popup

                // console.error('Registration failed:', response);
            }
        } catch (error) {
            console.error('Error during registration:', error);
        }
    }

    return (
        <div className="h-[calc(100vh_-_64px)] flex items-center justify-center bg-primary">
            <div className="absolute right-0 h-1/2 z-0 md:h-4/5">
                <img className="w-full h-full object-contain" src={image} alt="register image" />
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col items-center z-10">
                <div className="w-80">
                    <label className="input validator">
                        <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <g
                                strokeLinejoin="round"
                                strokeLinecap="round"
                                strokeWidth={2.5}
                                fill="none"
                                stroke="currentColor"
                            >
                                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                                <circle cx="12" cy="7" r="4"></circle>
                            </g>
                        </svg>
                        <input
                            type="text"
                            required
                            placeholder="Username"
                            pattern="[A-Za-z][A-Za-z0-9\-]*"
                            minLength={3}
                            maxLength={30}
                            title="Only letters, numbers or dash"
                            name="userName"
                            value={userInfo.userName} onChange={handleInputChange}
                        />
                    </label>
                    <div className="validator-hint">
                        Must be 3 to 30 characters
                        <br />containing only letters, numbers or dash
                    </div>
                </div>
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
                        <input type="email" placeholder="mail@site.com" required
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
                            type="password"
                            required
                            placeholder="Password"
                            minLength={8}
                            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                            title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
                            name="password" value={userInfo.password} onChange={handleInputChange}
                        />
                    </label>
                    <p className="validator-hint">
                        Must be more than 8 characters, including
                        <br />At least one number <br />At least one lowercase letter <br />At least one uppercase letter
                    </p>
                </div>
                <button className="btn btn-neutral w-40" type="submit">Register</button>
                <div className="mt-3">Already have a account? <Link to={"/login"} className="underline text-gray-400 hover:text-gray-700">Sign in</Link> </div>
            </form>
        </div>
    )
}

export default RegisterPage;