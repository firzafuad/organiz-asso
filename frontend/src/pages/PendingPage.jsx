import { useContext } from 'react';
import { UserContext } from '../context/UserContext';

import { api, BACK_URI } from '../utils/constants';

function PendingPage() {
    const { user, setUser } = useContext(UserContext);

    async function handleLogout() {
        try {
            await api.post("/auth/logout");
            setUser(null);
        } catch (error) {
            alert("Logout failed");
            console.log(error.response?.data?.error || "Error API Logout")
        }
    }

    return (
    <div className="flex flex-col items-center justify-center min-h-screen">
        <p className="pb-8">Votre inscription est en attente de validation par un administrateur.</p>
        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={handleLogout}>Logout</button>
    </div>
    );
}

export default PendingPage;