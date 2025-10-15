import { useEffect, useState } from "react";
import { BASE_URL } from "../utils/consts";
import { useAuth } from "../customHooks/AuthHook";

const AdminPage = () => {
    const [users, setUser] = useState<UserType[] | null>(null);
    const [loading, setLoading] = useState(true); // optional loading state
    const [error, setError] = useState<string | null>(null);

    const { token } = useAuth();

    const handleClick = async () => {
        try {
            const response = await fetch(BASE_URL + '/users', {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (!response.ok) throw new Error('Failed to fetch user');
            const data: UserType[] = await response.json();
            console.log(data)
            setUser(data);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    return (<>
        <button className="btn btn-neutral" onClick={handleClick}>Neutral</button>
        {loading && <h1>loading....</h1>}
        {error && <h1>error: {error}</h1>}
        {users && (
            <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Created at</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user: UserType) => (
                            <tr key={user.id}>
                                <th>{user.id}</th>
                                <td>{user.username}</td>
                                <td>{user.email}</td>
                                <td>{user.role}</td>
                                <td>{user.created_at}</td>
                            </tr>
                        ))}

                    </tbody>
                </table>
            </div>

        )}
    </>);
}

export default AdminPage;

export type UserType = {
    email: string,
    id: number,
    created_at: string,
    role: string,
    username: string,
    // password: string
} 
