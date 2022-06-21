import React, { useEffect, useState } from 'react'
import './navbar.css'
import { Link } from 'react-router-dom';
import { HiMenuAlt1 } from 'react-icons/hi';
import { AiOutlineClose } from 'react-icons/ai';

export default function Navbar() {
    const [scroll, setScroll] = useState(false);
    const [menu, setMenu] = useState(false);
    useEffect(() => {
        window.addEventListener('scroll', () => {
            (window.pageYOffset >= 200) ? setScroll(true) : setScroll(false)
        });
    }, [window.pageYOffset]);

    return (
        <div className={`navbar`}>
            <div className='navbarContainer'>
                <div className='navbarTitle'>
                    <Link to="/">
                        <h1>Etkinliğini Bul</h1>
                    </Link>
                </div>
                <div className='navbarMenu'>
                    <ul>
                        <li>
                            <Link to="/search">Bul</Link>
                        </li>
                        <li>
                            <Link to="#">Favoriler</Link>
                        </li>
                        <li>
                            <Link to="#">Biletlerim</Link>
                        </li>
                    </ul>
                </div>
                <div className='navbarButtons'>
                    <Link to="#">Kayıt Ol</Link>
                </div>
                <div className='mobileMenuIcon' onClick={() => setMenu(!menu)}>
                    {
                        menu ?
                            <AiOutlineClose style={{ color: "#fff", fontSize: "2rem" }} />
                            :
                            <HiMenuAlt1 style={{ color: "#fff", fontSize: "2rem" }} />
                    }

                </div>
            </div>

            <div className='mobileMenu' style={{ right: `${menu ? "0" : "-250px"}` }}>
                <div className='navbarMenu'>
                    <ul>
                        <li>
                            <Link to="/search">Bul</Link>
                        </li>
                        <li>
                            <Link to="#">Favoriler</Link>
                        </li>
                        <li>
                            <Link to="#">Biletlerim</Link>
                        </li>
                    </ul>
                </div>
                <div className='navbarButtons'>
                    <Link to="#">Kayıt Ol</Link>
                </div>
            </div>
        </div>

    )
}
