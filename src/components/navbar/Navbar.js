import React, { useEffect, useState } from 'react'
import './navbar.css'

export default function Navbar() {
    const [scroll, setScroll] = useState(false);
    useEffect(() => {
        window.addEventListener('scroll', () => {
            (window.pageYOffset >= 200) ? setScroll(true) : setScroll(false)
        });
    }, [window.pageYOffset]);

    return (
        <div className={`${scroll ? "navbarBg" : ""} navbar`}>
            <div className='navbarContainer'>
                <div className='navbarTitle'>
                    <h1>Etkinliğini Bul</h1>
                </div>
                <div className='navbarMenu'>
                    <ul>
                        <li>
                            <a href="#">Bul</a>
                        </li>
                        <li>
                            <a href="#">Favoriler</a>
                        </li>
                        <li>
                            <a href="#">Biletlerim</a>
                        </li>
                    </ul>
                </div>
                <div className='navbarButtons'>
                    <a href="#">Kayıt Ol</a>
                </div>
            </div>
        </div>

    )
}
