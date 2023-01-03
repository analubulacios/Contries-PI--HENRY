import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCountries,getCountryByName,setPagination } from '../../redux/actions';
import './Paginate.css';

export default function Paginate (){


    const tPages = useSelector((state)=>state.pages);//25
    const currentPage = useSelector((state)=> state.currentPage);
    const dispatch = useDispatch();
    const search = useSelector((state)=>state.searchCountries);//25
    let searchCountries = getCountries();
    if(search){
        searchCountries = getCountryByName()
    }

    useEffect(()=>{
        dispatch(searchCountries) 
    },[dispatch])
    const pageNumber = [];

    // while(tPages > 0){
    //     pageNumber.unshift(tPages)
    //     tPages = tPages - 1
    // }

    return (
        
        <div className='container'>
            <button className='bton' disabled={currentPage === 1 ? true : false}  onClick={()=>dispatch(setPagination(1))} >FIRST</button>
            <button className='bton' disabled={currentPage === 1 ? true : false}  onClick={()=>dispatch(setPagination(currentPage - 1))}>PREV</button>
            {/* <h4>{pageNumber.map(p => <button></button>) `${currentPage} / ${tPages}` }</h4> */}
            <button className='bton' disabled={currentPage === tPages ? true : false} onClick={()=>dispatch(setPagination(currentPage + 1))}>NEXT</button>
            <button className='bton' disabled={currentPage === tPages ? true : false} onClick={()=>dispatch(setPagination(tPages))}>LAST</button>
            
        </div>

    )


}



