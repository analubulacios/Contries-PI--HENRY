import React from 'react';
import { Link } from 'react-router-dom';
import style from './LandingPage.module.css';
import { FaGithub, FaLinkedinIn } from 'react-icons/fa'

export default function LandingPage(){
    return (
            <div className={style.container}>
               <div className={style.header}>
                  <h3>Henry's PI</h3>
                  <h2>Countries App</h2>
                 
               </div>
               
               <div className={style.activities}>
                  <h1>Search and register new activities ...</h1>
               </div>
     
               <div>
                  <Link to='/home'>
                     <button className={style.btonexplore}>Explore!</button>
                  </Link>
               </div>
         
               <footer className={style.message} >
                  <div >
                     <p>Developed by Ana Lucia Bulacios</p>
                  </div>        
                  <div>
                     <a href='https://www.linkedin.com/in/ana-lucia-bulacios-9592a8255/' target='_blank' rel='noreferrer'><FaGithub /></a>
                     <a href='https://github.com/analubulacios' target='_blank' rel='noreferrer'><FaLinkedinIn/></a>
                  </div>
               </footer>
            </div>  
               
           
           
         )    
}