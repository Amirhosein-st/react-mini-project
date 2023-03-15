import React from 'react'
import { Link } from 'react-router-dom'
import { FaReplyAll } from 'react-icons/fa'

import './Header.css';

const Header = () => {
    return (
        <div className='header-box'>
            <div className='left-buttons'>
                <Link to="/" style={{ textDecoration: 'none' }}>
                    <button className='all-cards-button'><FaReplyAll />BACK</button>
                </Link>
            </div>
            <p className='header-text'>Star Wars App - <span className='header-text-span'>Mini Project</span></p>
            <p className='name-right-header'>Amir Hosein Safari</p>
        </div>
    )
}

export default Header