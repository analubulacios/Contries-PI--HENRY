import React from 'react';
import { Link } from 'react-router-dom'


export default function LandingPage(){
    return (
            <div>
               <div>
                  <h3>Henry's PI</h3>
               </div>
               <br/>
               <div>
                  <h1>Countries App</h1>
               </div>
               <br/>
               <div>
                  <h4>Search and register new activities around the world...</h4>
               </div>
               <br/>
               <div>
                  <Link to='/home'>
                     <button>Start!</button>
                  </Link>
               </div>
               <br/>
               <div>
                  <h5>Desing & Development by Ana Lucia Bulacios</h5>
               </div>
            </div>  
         )    
}