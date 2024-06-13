import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <div className="h-[6vh] flex justify-center items-center">
            <Link to="/" className="py-2 px-3 rounded-md border border-base-300">View Labs</Link>
        </div>
    );
};

export default Navbar;