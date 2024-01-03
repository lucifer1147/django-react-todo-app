import React from "react";
import {Link} from "react-router-dom";

function NavBar(props) {
    return (
        <div className="px-24 py-12 bg-gray-100 flex justify-between shadow-black shadow-md sticky top-0">
            <h1 className="text-xl font-extrabold">TodoTracker</h1>

            <ul className="flex gap-x-10">
                <li className="text-gray-700 font-semibold"><Link to="/">Home</Link></li>
                <li className="text-gray-700 font-semibold"><Link to="/">About</Link></li>
                <li className="text-gray-700 font-semibold"><Link to="/">API</Link></li>
            </ul>

            <form action="" className="flex gap-x-5">
                <input type="text" name="search-field" className="rounded-2xl shadow-black shadow-2xl focus:outline-0 px-3 py-1" />
                <input type="submit" value="Search" name="search-submit"/>
            </form>
        </div>
    )
}

export default NavBar;
