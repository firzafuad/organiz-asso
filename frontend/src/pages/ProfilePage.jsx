import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useContext } from "react";

import { api, BACK_URI } from "../utils/constants";
import { UserContext } from "../context/UserContext";
import ProfileCard from "../components/ProfileCard";

function ProfilePage() {
    const { username } = useParams();
    const { user } = useContext(UserContext);
    const [profileData, setProfileData] = useState(null);
    const [error, setError] = useState("");
    const [isEditing, setIsEditing] = useState(false);

    
    useEffect(() => {
        async function fetchProfile() {
            try {
                const response = await api.get("/users/" + username);
                setProfileData(response.data);
            } catch (error) {
                setError(error.response?.data?.error);
            }
        }

        fetchProfile();
    }, [username]);

    if (error) {
        return <p>{error}</p>;
    }

    if (!profileData) {
        return <p>Chargement</p>;
    }
        async function handleDelete(id) {
        try {
            await api.delete("/messages/" + id);
            setProfileData({
                ...profileData,
                messages: profileData.messages.filter((msg) => msg.id !== id)
            });
        } catch (error) {
            console.log("Delete error:", error);
        }
    }
    return (
    <div>
        <ProfileCard 
            user={profileData.user}
            messages={profileData.messages}
            onDelete={handleDelete}
        />
    </div>
);
}

export default ProfilePage;