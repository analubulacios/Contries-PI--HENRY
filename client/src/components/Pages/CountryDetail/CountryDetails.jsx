import { useEffect } from "react";
import { useDispatch,useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getCountrydetail } from "../../../redux/actions";
//import la Activity asociada al paisid //

export default function CountryDetail () {

    const countryDetail= useSelector((state)=> state.countryDetail);
    const dispatch = useDispatch();

    let {idPais} = useParams();
    useEffect(()=>{
        dispatch(getCountrydetail(idPais));
        
    }, [idPais]);

    return (
        <div>
        {
        Object.keys(countryDetail).length  > 0 && 
            <div className='countryContainer'>
                <h1>{countryDetail.name}</h1>
                <h3>{countryDetail.id}</h3>
                    <div className='imgContainer'>
                        <img src={countryDetail.flags} alt='flag img' />
                    </div>
                        <h5>Capital:{countryDetail.capital}</h5>
                        <h5>Subregion:{countryDetail.subRegion}</h5>
                        <h5>Area:{countryDetail.area} Km2</h5>
                        <h5>Population:{countryDetail.population} Hab. </h5>          
            </div>
        }
        </div>
        
      );
};















// el hook useParams de React Router nos permite acceder desde un componente a los parámetros de la ruta. Para ello, nos devuelve un objeto de claves/valores con los parámetros dinámicos de la URL.
