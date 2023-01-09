import React from 'react';
import { Link } from 'react-router-dom';
import style from './NavBar.module.css';
import { BiWorld } from 'react-icons/bi';

function NavBar() {
  return (
    <header className={style.header}>
        <div className={style.welcome}>
            <Link to='/'><BiWorld />Countries App</Link>
        </div>
        <div className={style.links}>
          <Link to='/home'  className={style["btn btn-primary"]}>Home</Link>
          <Link to='/activity' className={style["btn btn-primary"]}>Add Activity</Link>                   
        </div>      
    </header>
  )
}

export default NavBar