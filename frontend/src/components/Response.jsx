function Response(props) {
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

        return date + " à " + time;
    };

    return (
        <div>
            <p>
                <span>{props.response.author}</span> - <time className="opacity-50">{formatDate(props.response.date)}</time>
            </p>
            <p>{props.response.text}</p>
        </div>
    );
}

export default Response;