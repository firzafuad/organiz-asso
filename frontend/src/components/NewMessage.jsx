import { useContext } from "react";
import { useState } from "react";

import { UserContext } from "../context/UserContext";
import { api, BACK_URI } from "../utils/constants";
import "../styles/NewMessage.css";

function NewMessage(props) {
    const [text, setText] = useState("");
    const [error, setError] = useState("");
    const { user } = useContext(UserContext);

    async function submitHandler(evt) {
        evt.preventDefault();
        try {
            const response = await api.post("/messages", {
                author: user.username,
                text,
                parentId: props.parentId || null
            });
            props.onSubmit(response.data.message);
        } catch (error) {
            setError(error.response?.data?.error);
        }
    }

    return <form className="grid">
        <label method='POST' htmlFor="text_new_comment" >Nouveau message:</label>
        <textarea id="text_new_comment" rows="4" className="h-20" onChange={(evt) => {setText(evt.target.value);}}></textarea>
        <button type='submit' className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onClick={submitHandler}>Send</button>
        {error && (<p style={{ color: 'red' }}>{error}</p>)}
    </form>
}

export default NewMessage;