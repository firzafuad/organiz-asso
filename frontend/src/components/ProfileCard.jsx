function ProfileCard(props) {
    return (
        <div>
            <h2>{props.user.name}</h2>
            <p>@{props.user.username}</p>
            <p>{props.user.email}</p>
            <h3>Messages publiés</h3>
            <ul>
                {props.messages && props.messages.map((msg) => (
                    <li key={msg.id}>
                        <p>{msg.text}</p>
                        {props.isOwner === true && (
                            <button onClick={() => props.onDelete(msg.id)}>Supprimer</button>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ProfileCard;