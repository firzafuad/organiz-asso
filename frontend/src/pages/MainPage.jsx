import { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import Avatar from '../components/Avatar';
import Message from '../components/Message';

import logo from '../assets/Logo_SU.png';
import { UserContext } from '../context/UserContext';
import { BACK_URI } from '../utils/constants';
import NewMessage from '../components/NewMessage';

const api = axios.create({
  baseURL: BACK_URI,
  withCredentials: true
});

function MainPage() {
    const { user, setUser } = useContext(UserContext);
    const [ messages, setMessages ] = useState([])
    const [ error, setError] = useState("");

    useEffect(() => {
        async function fetchMessages() {
            try {
                const response = await api.get("/messages");
                setMessages(response.data.messages);
            } catch (error) {
                setError(error.response?.data?.error);
                setMessages([])
            }
        }

        fetchMessages();
    }, []);

    async function handleLogout() {
        try {
        await api.post("/auth/logout");
        setUser(null);
        } catch (error) {
        alert("Logout failed");
        console.log(error.response?.data?.error || "Error API Logout")
        }
    }

    const connection = () => {
        if (user === null) {
            return <div id="connect" className="w-1/4 h-24 flex items-center justify-end gap-4">
                <Link to="/login">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Connexion</button>
                </Link>
                <Link to="/signup">
                    <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">Inscription</button>
                </Link>
            </div>
        } else {
            return <div id="connect" className="w-1/4 h-24 flex items-center justify-end gap-4">
                <Avatar user={user} />
                <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={handleLogout}>Logout</button>
            </div>
        }
    }

    const addMessage = (msg) => {
        setMessages([msg, ...messages])
    }

    return (
        <div className="flex font-sans flex-col">
            <header className="flex">
                <div id="logo" className="w-1/4 h-24">
                    <img src={logo} className='h-20' alt="Logo de l'association" id="logo_image" />
                </div>
                <div id="search" className="w-1/2 h-24">
                    <form id="search_form">
                    <input id="requete" placeholder="Rechercher..." className='border-2 border-solid rounded'/>
                    <input className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="submit" id="search_button" />
                    <div id="filtre_div">
                        <label htmlFor="date_deb">Date de début</label><input type="date" id="date_deb" />
                        <label htmlFor="date_fin">Date de fin</label><input type="date" id="date_fin" />
                    </div>
                    </form>
                </div>
                {connection()}
            </header>
            <main className="flex w-full">
                <aside className="w-1/5"></aside>
                <section className="flex w-4/5 flex-col">
                    <div id="new_comment" className="w-full">
                        <NewMessage onSubmit={addMessage} />
                    </div>
                    <article className="w-full">
                        {
                            error && <p className='text-red-200'>{error}</p> ||
                            <ul>
                                {messages.map((msg) => <Message key={msg.id} author={msg.author} date={msg.date} text={msg.text} replies={msg.replies} />)}
                            </ul>
                        }
                    </article>
                </section>  
            </main>
        </div>
    );
}

export default MainPage;