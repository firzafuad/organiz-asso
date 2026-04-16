import { Link } from "react-router-dom";

function NavBar() {
    return (
        <nav className="w-full h-16 bg-green-500 flex items-center justify-between px-4">
            <div className="text-white font-bold text-lg">Organiz-Asso</div>
            <div>
                <Link to="/dashboard" className="text-white hover:text-gray-300 mx-2">Home</Link>
                <Link to="/profile" className="text-white hover:text-gray-300 mx-2">Profile</Link>
                <Link to="/settings" className="text-white hover:text-gray-300 mx-2">Settings</Link>
            </div>
        </nav>
    );
}

export default NavBar;