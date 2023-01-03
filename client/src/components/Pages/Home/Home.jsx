import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCountries }  from '../../../redux/actions/index';
import CountryCard from '../../CountryCard/CountryCard';
import  SearchBar from '../SearchBar/SearchBar';
import Paginate from '../../Paginate/Paginate';
import FilterOrder from '../../FilterOrder/FilterOrder';
import './Home.css';


export default function Home (){

    
    const allCountries = useSelector((state)=>state.countries); // analogo al mapstatetoprop y guardado en una constante ...
    const currentPage = useSelector ((state)=> state.currentPage);
    const indexOfFirstCountries = useSelector((state)=>state.indexOfFirstCountries);
    const indexOfLastCountries = useSelector((state)=>state.indexOfLastCountries);
    const search = useSelector((state)=> state.searchCountries);
    
    const dispatch = useDispatch(); // guardo funcion dispatch en constante para despachar las acciones...
    // traemos los countries cuando el componente se monta..
    useEffect(()=>{
        dispatch(getCountries()) //analogo al mapdispatchtoprop
    },[])
   
    // useEffect(()=>{
    //     console.log(indexOfFirstCountries,indexOfLastCountries)
    // }, [currentPage])
   
    const currentCountries = allCountries.slice(currentPage == 1 ? 0 :indexOfFirstCountries, search === false && currentPage == 1 ? 9 :indexOfLastCountries);
    return (
        <div>
            <div>
                <SearchBar/>
            </div>
            <div>
                <FilterOrder/>
            </div>
            <div className='CardsCountries'>
            {
            currentCountries.length > 0 ? currentCountries.map((c) => (<CountryCard
            idPais={c.id}
            key = {c.id}
            urlImg={c.flags}
            name={c.name}
            continent={c.continent}/>))
            : <p>Loading...</p>
            }
            </div>
            <div>
                <Paginate/>    
            </div>
        </div>
    );       
};




//mapstatetoprop conecta los componentes con los estados globales
//mapdispatchtoprop conecta los componentes con la capacidad de llegar al reducer


 
    