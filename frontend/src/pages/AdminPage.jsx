import { useContext, useState, useEffect } from "react"
import { UserContext } from "../context/UserContext"
import { Link, Navigate } from "react-router-dom";

import Avatar from '../components/Avatar';

import { api, BACK_URI } from "../utils/constants";
import logo from '../assets/Logo_SU.png';
import UserAction from "../components/UserAction";

function AdminPage() {
    const { user, setUser } = useContext(UserContext);
    const [ userList, setUserList ] = useState([]);
    const [ role, setRole ] = useState("");
    const [ error, setError ] = useState("")

    useEffect(() => {
        async function fetchUsers() {
            try {
                const response = await api.get("/users", {
                    params: { role }
                });
                setUserList(response.data.users.filter(
                    (u) => u.username !== user.username
                ));
            } catch (error) {
                setError(error.response?.data?.error);
                setUserList([]);
            }
    }
        fetchUsers();
    }, [role]);

    const onDelete = (user) => {
        setUserList(userList.filter(
            (u) => u.username !== user.username
        ));
    }

    const onUpdate = (user) => {
        setUserList(userList.map(
            (u) => u.username === user.username ? { ...u, role:user.role } : u
        ));
    }

    async function handleLogout() {
        try {
        await api.post("/auth/logout");
        setUser(null);
        } catch (error) {
        alert("Logout failed");
        console.log(error.response?.data?.error || "Error API Logout")
        }
    }

    if (!user || user.role !== "admin") return <Navigate to="/" />
    return (
        <div className="flex font-sans flex-col">
            <header className="flex">
                <Link to="/" id="logo" className="w-1/4 h-24">
                    <img src={logo} className='h-20' alt="Logo de l'association" id="logo_image" />
                </Link>
                <div id="search" className="w-1/2 h-24"></div>
                <div id="connect" className="w-1/4 h-24 flex items-end justify-end gap-4">
                    <Avatar user={user} />
                    <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={handleLogout}>Logout</button>
                </div>
            </header>
            <h1>Liste des utilisateurs</h1>
            <div className="flex max-w-9/12 self-center">
                <label htmlFor="options" className="px-8">Role</label>
                <select id="options" onChange={(e) => setRole(e.target.value)}>
                    <option value="" hidden>Choisir role</option>
                    <option value="">Tout</option>
                    <option value="pending">En attente</option>
                    <option value="admin">Administrateurs</option>
                    <option value="member">Membres</option>
                </select>
            </div>
            <ul className="justify-items-center">
                {userList.map((user) => <UserAction key={user.username} user={user} onDelete={onDelete} onUpdate={onUpdate} className="w-xl border-2 rounded-2xl my-4" />)}
            </ul>
        </div>
    )
};

export default AdminPage;