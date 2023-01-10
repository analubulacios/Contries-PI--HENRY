import { Fragment, useEffect } from "react";
import { useDispatch,useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getCountrydetail } from "../../../redux/actions";
import NavBar from "../../NavBar/NavBar";



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
        <NavBar/>
        <div> */aca definir un classnamepara el contenedor del pais */        
        {
        Object.keys(countryDetail).length  > 0 && //tomo de referencia el css de formde creacion classname form fields field 
            (<div className='countryContainer'>
                <h1>{countryDetail.name}</h1>
                <h3>{countryDetail.id}</h3>
                    <div className='imgContainer'> // mas pequeno que mi contenedor principal 
                        <img src={countryDetail.flags} alt='flag img' />
                    </div>
                        <h5>Capital:{countryDetail.capital}</h5>
                        <h5>Subregion:{countryDetail.subRegion}</h5>
                        <h5>Area:{countryDetail.area} Km2</h5>
                        <h5>Population:{countryDetail.population} Hab. </h5>          
            </div>)
            
        }
        </div>
        <div> //aca asignar classname para separar las actividades de la card del pais 
            {           
             countryDetail.activities ? (
                <div>
                    <h2>Activities:</h2>
                    {countryDetail.activities.map(e => (
                        <div>
                            <h3>Name: {e.name}</h3>
                            <h3>Difficulty: {e.difficulty}</h3>
                            <h3>Duration: {e.duration}</h3>
                            <h3>Season: {e.season}</h3>
                           
                        </div>
                      ))
                    }
                </div>    
                ):
                (<div>
                    <p> No activities linked...  </p>

                </div>)
             
                  
            }

        </div>
        </>
      );
};















// el hook useParams de React Router nos permite acceder desde un componente a los parámetros de la ruta. Para ello, nos devuelve un objeto de claves/valores con los parámetros dinámicos de la URL.
