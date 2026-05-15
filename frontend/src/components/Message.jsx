function Message(props) {
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
    return <div >
        <p><span>{props.author}</span> - <time className="opacity-50">{date.toLocaleString()}</time></p>
        <p>{props.text}</p>
        <ul>
            {props.replies && props.replies.map((rep) => <Message key={rep.id} author={rep.author} date={rep.date} text={rep.text} replies={rep.replies} />)}
        </ul>
    </div>
}

export default Message;