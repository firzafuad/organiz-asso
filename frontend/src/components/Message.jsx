function Message(props) {
    return <div >
        <p><span>{props.author}</span> - <time>{props.date}</time></p>
        <p>{props.text}</p>
        <ul>
            {props.replies && props.replies.map((rep) => <Message key={rep.id} author={rep.author} date={rep.date} text={rep.text} replies={rep.replies} />)}
        </ul>
    </div>
}

export default Message;