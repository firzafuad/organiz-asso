import logo from '../assets/Logo_SU.png';
import Avatar from '../components/Avatar';
import { Link } from 'react-router-dom';

function MainPage(props) {
    const user = props.user || null;

    const connection = () => {
        if (user === null) {
            return <div id="connect" className="w-1/4 h-24 flex items-center justify-end gap-4">
                <Link to="/login">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Connexion</button>
                </Link>
                <Link to="/signin">
                    <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">Inscription</button>
                </Link>
            </div>
        } else {
            return <div id="connect" className="w-1/4 h-24 flex items-center justify-end gap-4">
                <Avatar user={{name: "User Haha"}} />
                <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Logout</button>
            </div>
        }
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
                        <label for="date_deb">Date de début</label><input type="date" id="date_deb" />
                        <label for="date_fin">Date de fin</label><input type="date" id="date_fin" />
                    </div>
                    </form>
                </div>
                {connection()}
            </header>
            <main className="flex w-full">
                <aside className="w-1/5"></aside>
                <section className="flex w-4/5 flex-col">
                    <div id="new_comment" className="w-full h-24">
                    <form id="new_comment_form">
                        <label for="text_new_comment">Nouveau message&thinsp;:</label>
                        <textarea id="text_new_comment" rows="2" cols="40"></textarea>          
                        <input type="submit" id="new_button" />
                    </form>        
                    </div>
                    <article className="w-full">
                    <ul>
                        <li>
                        <p><span>Utilisateur 1</span> -- <time>30/01/2024 à 13:53</time></p>
                        <blockquote>Ceci est un deuxième message (<button>+</button>)</blockquote>
                        </li>
                        <li>
                        <p><span>Utilisateur 2</span> -- <time>30/01/2024 à 13:51</time></p>
                        <blockquote>Ceci est un premier message (<button>+</button>)
                            <div id="msg20240130-135210">
                            <p><span>Utilisateur 1</span> -- <time>30/01/2024 à 13:52</time></p>
                        <blockquote>Ceci est une réponse (<button>+</button>)</blockquote>
                            </div>              
                        </blockquote>
                        </li>
                    </ul>
                    </article>
                </section>  
            </main>
        </div>
    );
}

export default MainPage;