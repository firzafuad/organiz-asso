import { useState } from "react";
import NewMessage from "./NewMessage";
import ResponseList from "./ResponseList";
import { Link } from "react-router-dom";

function Message(props) {
    const [showReply, setShowReply] = useState(false);

    const formatDate = (dateString) => {
        const date = new Date(dateString).toLocaleString('fr-FR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        const time = new Date(dateString).toLocaleString('fr-FR', {
            hour: '2-digit',
            minute: '2-digit'
        });

        return `${date} à ${time}`;
    };

    const date = formatDate(props.date);

    return( 
    <div>
        <p>
            <Link to={"/profile/" + props.author}><span>{props.author}</span></Link> - <time className="opacity-50">{date}</time>
        </p>

        <p>{props.text}</p>

        <button onClick={() => setShowReply(!showReply)}>{showReply ? "Annuler" : "Répondre"}</button>

        {showReply && <NewMessage parentId={props.id} onSubmit={(msg) => { props.onReply(msg); setShowReply(false); }} />}
        {props.replies && props.replies.length > 0 && (<ResponseList responses={props.replies} />)}
    </div>
    );
}

export default Message;