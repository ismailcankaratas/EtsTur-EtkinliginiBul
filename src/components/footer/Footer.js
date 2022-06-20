import React from 'react'
import useFetch from '../../hooks/useFetch'
import "./footer.css"

export default function Footer() {
    const categories = useFetch("/data/db.json", "categories")
    return (
        <footer>
            <div className='footerWrapper'>
                <div className='footerLinkBlock'>
                    <span className='blockTitle'>Kurumsal</span>
                    <ul>
                        <li>
                            <a href="#">Hakkımızda</a>
                        </li>
                    </ul>
                </div>
                <div className='footerLinkBlock'>
                    <span className='blockTitle'>Kategoriler</span>
                    <ul>
                        {
                            categories.data.map(category => (
                                <li key={category.id}>
                                    <a href={`/${category.name}`}>{category.name}</a>
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>
            <div className='copyright'>Etkinligini Bul &copy; 2022 <a href="https://www.linkedin.com/in/ismailcankaratas/"> İsmail Can Karataş</a></div>
        </footer>
    )
}
