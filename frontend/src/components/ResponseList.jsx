import Response from "./Response";

function ResponseList(props) {
    return (
        <ul>
            {props.responses.map((response) => (
                <Response key={response.id} response={response} />
            ))}
        </ul>
    );
}

export default ResponseList;