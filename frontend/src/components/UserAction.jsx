import { useState, useEffect } from "react"
import { Link } from "react-router-dom";
import { api } from "../utils/constants";

function UserAction({ user, className, onDelete, onUpdate }) {
    const [ status, setStatus ] = useState(user.role);
    const [ error, setError ] = useState("");

    const actions = {
        admin: [{ label: "Rétrograder", value: "member" }],
        member: [{ label: "Promouvoir", value: "admin" }, { label: "Supprimer", value: "delete"}],
        pending: [{ label: "Valider", value: "member" }, { label: "Rejeter", value: "delete" }]
    }

    const colors = {
        admin: "text-blue-400",
        member: "text-green-400",
        pending: "text-amber-400"
    }

    async function handleAction() {
        if (status === user.role) return ;
        if (status === "delete") {
            try {
                await api.delete(`/users/${user.username}`);
                onDelete(user);
            } catch (error) {
                setError(error.response?.data?.error);
                setTimeout(() => {
                    setError(null)
                }, 3000);
            }
        } else {
            try {
                await api.post(`/users/${user.username}`, null, {
                    params: {role: status}
                })
                onUpdate(user, status);
            } catch (error) {
                setError(error.response?.data?.error);
                setTimeout(() => {
                    setError(null)
                }, 3000);
            }
        }
    }

    const handleCancel = () => {
        setStatus("");
    }

    return (
        <div className={className}>
            <div className="py-2 flex justify-around items-start">
                <div className="flex-1 text-start pl-8 pr-2">
                    <Link to={"/profile/" + user.username}>{user.name}</Link>
                    <span className={"ml-4 "+colors[user.role]}>{user.role}</span>
                </div>
                <select value={status ?? ""} onChange={(e) => setStatus(e.target.value)} className="min-w-32 text-center">
                    <option value="" hidden>Action</option>
                    {actions[user.role].map(({ label, value }) => (
                        <option key={value} value={value}>{label}</option>
                    ))}
                </select>
                <button type="submit" onClick={handleAction} className="pl-4 pr-2"><span>&#10004;</span></button>
                <button onClick={handleCancel} className="pl-2 pr-8"><span>&#10006;</span></button>
            </div>
            {error && <p className=" text-red-500 text-start pl-8">{error}</p>}
        </div>
    )
}

export default UserAction;