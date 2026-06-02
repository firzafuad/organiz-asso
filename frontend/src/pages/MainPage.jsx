import { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import Avatar from '../components/Avatar';
import Message from '../components/Message';
import Filters from '../components/Filters';
import SearchBar from '../components/SearchBar';
import NewMessage from '../components/NewMessage';
import PendingPage from './PendingPage';
import logo from '../assets/Logo_SU.png';
import { UserContext } from '../context/UserContext';
import { api, BACK_URI } from '../utils/constants';

function MainPage() {
    const { user, setUser } = useContext(UserContext);
    const [ messages, setMessages ] = useState([])
    const [ error, setError ] = useState("");
    const [ filters, setFilters ] = useState({});
    const [ search, setSearch ] = useState("");
    const [ category, setCategory ] = useState("public");

    useEffect(() => {
        async function fetchMessages() {
            try {
                console.log("params envoyés:", { ...filters, search });
                const response = await api.get("/messages", { params: { ...filters, search, category } });
                setMessages(response.data.messages);
            } catch (error) {
                setError(error.response?.data?.error);
                setMessages([]);
            }
        }
        fetchMessages();
    }, [filters, search, category]);

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
            return <div id="connect" className="w-1/4 h-24 flex flex-col items-center justify-end gap-4 mt-8">
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
        if (msg.parentId) {
            setMessages(messages.map((m) => m.id === msg.parentId ? { ...m, replies: [...(m.replies || []), msg] } : m));
        } else {
            setMessages([msg, ...messages]);
        }
    }

    const handleFilter = (name, value) => {
        const newFilters = { ...filters };
        if (value === "") {
            delete newFilters[name];
        } else {
            newFilters[name] = value;
        }
        setFilters(newFilters);
    }

    const adminDisplay = () => {
        if (user?.role === "admin") {
            return (
                <div className='flex flex-col *:py-2'>
                    <h3 className='text-blue-100'>Admin Tools</h3>
                    <div>
                        <label htmlFor="cat" className="px-8 text-white">Catégorie</label>
                        <div className='flex flex-col justify-self-center bg-gray-700 rounded-md w-9/12'>
                            <button onClick={() => setCategory("public")} className={ "py-1 transition-all duration-300 " +
                                (category==="public" ? "bg-blue-500 rounded-md rounded-b-none text-white font-bold shadow-lg border-l-4 border-blue-500"
                                : "border-l-4 border-transparent text-gray-400 hover:text-white")} >
                                    Forum Ouvert
                            </button>
                            <button onClick={() => setCategory("private")} className={"py-1 transition-all duration-300 " +
                                (category==="private" ? "bg-red-500 rounded-md rounded-t-none text-white font-bold shadow-lg border-l-4 border-red-500"
                                : "border-l-4 border-transparent text-gray-400 hover:text-white")} >
                                    Forum Fermé
                            </button>
                        </div>
                            
                    </div>
                    <Link to="/admin">
                        <button className="bg-gray-700 hover:bg-mist-500 text-white font-bold py-2 px-4 rounded">Admin page</button>
                    </Link>
                </div>
            )
        }
    }

    if (user?.role === "pending") return <PendingPage />
    return (
        <div className="flex font-sans flex-col">
            <header className="flex">
                <div id="logo" className="w-1/4 h-24">
                    <img src={logo} className='h-20' alt="Logo de l'association" id="logo_image" />
                </div>
                <div id="search" className="w-1/2 h-24">
                    <form id="search_form">
                        <SearchBar onChange={(value) => setSearch(value)} />
                        <Filters onFilter={handleFilter} />
                    </form>
                </div>
                {connection()}
            </header>
            <main className="flex w-full">
                <aside className="w-1/5">
                    {adminDisplay()}
                </aside>
                <section className="flex w-4/5 flex-col">
                    <div id="new_comment" className="w-full">
                        <NewMessage onSubmit={addMessage} category={category} />
                    </div>
                    <article className="w-full">
                        {
                            error && <p className='text-red-200'>{error}</p> ||
                            <ul>
                                {messages.map((msg) => <Message key={msg.id} id={msg.id} author={msg.author} date={msg.date} text={msg.text} category={msg.category} replies={msg.replies} onReply={addMessage} />)}
                            </ul>
                        }
                    </article>
                </section>  
            </main>
        </div>
    );
}

export default MainPage;