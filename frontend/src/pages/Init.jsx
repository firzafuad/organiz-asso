import { useState } from "react";

function Init() {
    const [users, setUsers] = useState([]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const response = await fetch("http://localhost:5000/users");
        const users = await response.json();
        setUsers(users);
    }
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="submit" onClick={handleSubmit}>
                Get users
            </button>
            <div id="users_list">
                <ul>
                    {users.map(user => (
                        <li key={user.id}>{user.name}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Init;