import "../styles/ProfileCard.css";

function ProfileCard(props) {
    return (
        <div className="profile-card">
            <h2>{props.user.name}</h2>
            <p>users:{props.user.username}</p>
            <p>EMAIL:{props.user.email}</p>
            <h3>Messages publiés</h3>
            <ul>
                {props.messages && props.messages.map((msg) => (
                    <li key={msg.id}>
                        <p>{msg.text}</p>
                        <button onClick={() => props.onDelete(msg.id)}>
                            Supprimer
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ProfileCard;