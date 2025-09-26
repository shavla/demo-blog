import { useState } from "react";
import { useNavigate } from "react-router-dom";

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
            const response = await fetch('http://localhost:5000/register', {
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

    return (<>
        <form onSubmit={handleSubmit}>
            <label htmlFor="userName">name</label>
            <input type="text" id="userName" name="userName" value={userInfo.userName} onChange={handleInputChange} placeholder="Primary"
                className="input input-primary" />
            <br></br>
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
    </>)
}

export default RegisterPage;