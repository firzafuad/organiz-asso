function Avatar(props) {
    const initial = props.user?.name.split(" ").map((x) => x.charAt(0)).join("") || "U";
    return <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 w-16 h-16 rounded-full">
        {initial}
    </button>
}

export default Avatar;