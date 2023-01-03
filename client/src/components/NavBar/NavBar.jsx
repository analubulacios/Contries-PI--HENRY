import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

function NavBar() {
  return (
    <header className='header'>
        <nav className='nav'>
            <Link to='/'>WELCOME</Link>
            <Link to='/home'>HOME</Link>
            <Link to='/activity'>ADD ACTIVITY</Link>
        </nav>
    </header>
  )
}

export default NavBar