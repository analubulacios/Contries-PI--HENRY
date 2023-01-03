import React from 'react';
import { Link } from 'react-router-dom';
import './CountryCard.css';

export default function CountryCard (props) {
    console.log(props)
    return (
        
        < Link to={`/country/${props.idPais}`} className='CardContainer'>
            <img src={props.urlImg} alt={props.name}/>
            <div className='InfoStyle'>
                <p>{props.name}</p>
                <p>{props.idPais}</p>
                <p>{props.continent}</p>
            </div>    
        </Link>
    );    
};

