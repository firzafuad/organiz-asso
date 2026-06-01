import { Link } from "react-router-dom";

function Avatar(props) {
    const initial = props.user?.name.split(" ").map((x) => x.charAt(0)).join("") || "U";

    return (
        <Link to={"/profile/" + props.user.username}>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 w-16 h-16 rounded-full">
                {initial}
            </button>
        </Link>
    )
}

export default Avatar;