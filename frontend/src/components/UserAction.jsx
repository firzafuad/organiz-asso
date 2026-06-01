import { useState } from "react"
import { Link } from "react-router-dom";
import { api } from "../utils/constants";

function UserAction({ user, className, onDelete }) {
    const [ status, setStatus ] = useState(user.role);
    const [ error, setError ] = useState("")

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
        if (status === "delete") {
            try {
                api.delete(`/users/${user.username}`);
                onDelete(user);
            } catch (error) {
                setError(error.response?.data?.error);
            }
        } else {
            user.role = status;
            try {
                api.post("/users/", {
                    username: user.username,
                    role: status
                })
            } catch (error) {
                setError(error.response?.data?.error);
            }
        }
    }

    const handleCancel = () => {
        setStatus("");
    }

    return (
        <div className={className + " py-2 flex justify-around items-start"}>
            <div className="flex-1 text-start pl-4 pr-2">
                <Link to={"/profile/" + user.username}>{user.name}</Link>
                <span className={"ml-4 "+colors[user.role]}>{user.role}</span>
            </div>
            <select value={status ?? ""} onChange={(e) => setStatus(e.target.value)} className="min-w-32 text-center">
                <option value="" hidden>Action</option>
                {actions[user.role].map(({ label, value }) => (
                    <option key={value} value={value}>{label}</option>
                ))}
            </select>
            <div className="flex flex-col items-end pl-4 pr-2">
                <button type="submit" onClick={handleAction}><span>&#10004;</span></button>
                {error && <p className=" text-red-500">{error}</p>}
            </div>
            <button onClick={handleCancel} className="pl-2 pr-8"><span>&#10006;</span></button>
        </div>
    )
}

export default UserAction;