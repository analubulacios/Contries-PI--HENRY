import { Fragment, useEffect } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getCountrydetail } from '../../../redux/actions';
import NavBar from '../../NavBar/NavBar';
import style from './CountryDetail.module.css'



export default function CountryDetail () {

    const countryDetail= useSelector((state)=> state.countryDetail);
    const dispatch = useDispatch();

    let {idPais} = useParams();

    const activity = useSelector((state)=> state.activities)    
    
    useEffect(()=>{
        dispatch(getCountrydetail(idPais));
     
    }, [idPais]);

    return (
        <>
            <div className={style.containertotal}>
                <div>
                    <NavBar/>
                </div>
                        <div className={style.countryactivity}>
                            <div className={style.containercountry}>        
                                {
                                Object.keys(countryDetail).length  > 0 && 
                                    (<div className={style.detail}>
                                        <h1>{countryDetail.name}</h1>
                                        
                                                <img className={style.img} src={countryDetail.flags} alt='flag img'/>
                                        
                                                <p>Code: {countryDetail.id}</p>
                                                <p>Capital: {countryDetail.capital}</p>
                                                <p>Subregion: {countryDetail.subRegion}</p>
                                                <p>Area: {countryDetail.area} Km2</p>
                                                <p>Population: {countryDetail.population} Hab. </p>          
                                    </div>)                           
                                }
                            </div>
                            <div className={style.containeractivities}> 
                                    <div className={style.titleactivity}>
                                        <h2>Avaibable activities:</h2>
                                    </div>
                                {            
                                    countryDetail.activities ? (
                                    <div className={style.containeractivity}>
                                       
                                                {countryDetail.activities.map(e => (
                                            <div className={style.detailactivity}key={e.name}>
                                                
                                                <p>Name: {e.name}</p>
                                                <p>Difficulty: {e.difficulty}</p>
                                                <p>Duration: {e.duration}</p>
                                                <p>Season: {e.season}</p>
                                              
                                            
                                            </div>
                                                 ))
                                                 }
                                    </div>):
                                (<div>
                                    <span>No activities linked...</span>
                                </div>)                            
                                }
                            </div>
                        </div>
            </div>
        </>
      );
};















