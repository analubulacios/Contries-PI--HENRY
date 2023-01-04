import React from 'react';
import {useState, useEffect} from 'react';
import { useDispatch } from 'react-redux';
import { filterByActivity, filterByContinent, orderByName, orderbyPopulation } from '../../redux/actions';



export default function FilterOrder (){


	const [order, setOrder]= useState('');
	const dispatch = useDispatch();

	function handleFilterContinent(e){
		e.preventDefault();
		dispatch(filterByContinent(e.target.value))
	};

	// function handleFilterActivity(e) {
	// 	e.preventDefault();
	// 	dispatch(filterByActivity(e.target.value))
	// };
	
	function handleSortName(e){
		e.preventDefault();
		dispatch(orderByName(e.target.value))
	};

	function handleSortPop(e){
		e.preventDefault();
		dispatch(orderbyPopulation(e.target.value))
	};

    return(
        <div>
            <form>
           		 <div>				
					<select onChange={e => handleFilterContinent(e)}>
						<option value='0'>Filter by Continent</option>
						<option value='Africa'>Africa</option>
						<option value='Antarctica'>Antarctica</option>
						<option value='Asia'>Asia</option>
						<option value='Europe'>Europe</option>
						<option value='North America'>North America</option>
						<option value='South America'>South America</option>
						<option value='Oceania'>Oceania</option>
					</select>
				</div>
				{/* <div>				
				<select onChange={handleFilterActivity(e)}>
					<option value='0'>Filter by Activity</option>
						{activities?.map(e => {
							return <option key={e.activity_id} value={e.activity_id}>{e.name}</option>
						})}
				</select> 
				</div> */}
				<div>
					<select onChange={e=> handleSortName(e)}>
						<option value='0'>Order by name</option>
						<option value='A-Z'>A to Z</option>
						<option value='Z-A'>Z to A </option>
					</select>
					<select onChange={e=> handleSortPop(e)}>
						<option value= '0'>Order by population</option>
						<option value='Min-Max'>Population Asc</option>
						<option value='Max-Min'>Population Des</option>
					</select>
				</div>
    	    </form>
    	</div>
    )
}