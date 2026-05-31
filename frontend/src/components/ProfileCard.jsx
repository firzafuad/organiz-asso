function ProfileCard(props) {
    return (
        <div>
            <h2>{props.user.name}</h2>
            <p>@{props.user.username}</p>
            <p>{props.user.email}</p>
            {props.isOwner === true && (
                <button>Modifier le profil</button>
            )}
        </div>
    );
}

export default ProfileCard;