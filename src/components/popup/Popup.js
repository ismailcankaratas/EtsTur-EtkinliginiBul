import React from 'react'
import './popup.css'
import { AiOutlineClose } from 'react-icons/ai'
export default function Popup({ children, popup, setPopup }) {
    return (
        <div className='popupContainer' style={{ display: `${popup ? "flex" : "none"}` }}>
            <div className='popupContent'>
                <div className='popupClose' onClick={() => setPopup(!popup)}>
                    <AiOutlineClose />
                </div>
                {children}
            </div>
        </div>
    )
}
