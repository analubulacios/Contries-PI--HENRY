import React from 'react';
import { Link } from 'react-router-dom';
import style from './CountryCard.module.css';

export default function CountryCard (props) {
    // console.log(props)
    return (
        
        < Link to={`/country/${props.idPais}`} className={style.cardContainer}>
            <div className={style.img}>
            <img src={props.urlImg} alt={props.name}/>
            </div>
            <div className={style.infocard}>
                <p className={style.name}>{props.name}</p>
            </div>
            <div className={style.idandcontinent}>
                <p>{props.idPais}</p>
                <p>{props.continent}</p>
            </div>               
        </Link>
    );    
};

