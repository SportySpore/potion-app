import React from "react";
import logo from '../../img/logo.png';
import './navbar.css';


export const Navbar = () => {
    return (
        <nav className='nav'>
            <div className='container nav-inner'>
                <a href="#">
                    <img src={logo} alt={'oof'}/>
                </a>
            </div>
        </nav>
    );
}