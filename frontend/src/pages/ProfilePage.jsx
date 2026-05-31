import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import axios from "axios";
import { BACK_URI } from "../utils/constants";
import { UserContext } from "../context/UserContext";
import ProfileCard from "../components/ProfileCard";

const api = axios.create({
    baseURL: BACK_URI,
    withCredentials: true
});

function ProfilePage() {
    const { username } = useParams();
    const { user } = useContext(UserContext);
    const [profileData, setProfileData] = useState(null);
    const [error, setError] = useState("");

    
    const isOwner = user && user.username === username;

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

    return (
        <div>
            <ProfileCard user={profileData.user} isOwner={isOwner} />
        </div>
    );
}

export default ProfilePage;