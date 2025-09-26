import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
    const navigate = useNavigate();

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
            const response = await fetch('http://localhost:5000/login', {
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
                setUserInfo({ email: "", password: "" });
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

    return (<>
        <form onSubmit={handleSubmit}>
            <label htmlFor="email">email</label>
            <input type="text" id="email" name="email" value={userInfo.email} onChange={handleInputChange} placeholder="Primary"
                className="input input-primary" />
            <br></br>
            <label htmlFor="password">pass</label>
            <input type="text" id="password" name="password" value={userInfo.password} onChange={handleInputChange} placeholder="Primary"
                className="input input-primary" />
            <br></br>
            <button className="btn btn-neutral" type="submit">let's go</button>
        </form>
    </>);
}

export default LoginPage;