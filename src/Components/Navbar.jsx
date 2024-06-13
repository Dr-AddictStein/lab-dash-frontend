import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <div className="h-[10vh] flex justify-center items-center">
            <Link to="/" className="px-5 py-3  rounded-md border border-base-300 text-center">View Labs</Link>
        </div>
    );
};

export default Navbar;