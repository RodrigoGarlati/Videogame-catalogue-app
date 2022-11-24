import React from "react";
import { Link } from "react-router-dom";
import './navbar.css'

const Nav = function(){
    return(
        <div className="navbar">
            <Link to="/" className="navLink">
                    <div className="imglogo">
                        <img className="imglogo" src="https://cdn.shopify.com/s/files/1/0396/8794/6394/products/Purple_7ed3f1c3-d059-4818-b149-846368ed9984_800x.png?v=1598832362"></img>
                    </div>
                </Link>
            <ul className="navlist">
                <Link to="/home" className="navLink">
                    <li className="navitem">
                        HOME
                    </li>
                </Link>
                <Link to="/creategame" className="navLink">
                    <li className="navitem">
                        CREATE GAME
                    </li>
                </Link>
                <Link to="/genres" className="navLink">
                    <li className="navitem">
                        SEE GENRES
                    </li>
                </Link>
                <Link to="/creategenre" className="navLink">
                    <li className="navitem">
                        CREATE GENRE
                    </li>
                </Link>
            </ul>
        </div>
    )
}

export default (Nav)