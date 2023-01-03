import React from 'react';
import { useDispatch } from 'react-redux';
import { filterByContinent } from '../../redux/actions';



export default function FilterOrder (){

	const dispatch = useDispatch();
	function handleFilterContinent(e){
		e.preventDefault();
		dispatch(filterByContinent(e.target.value))
	}


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
			<div>
				
				{/* <select name='activity' id='activity' onChange={handleFilter}>
					<option value='0'>Filter by Activity</option>
						{activities?.map(e => {
							return <option key={e.activity_id} value={e.activity_id}>{e.name}</option>
						})}
				</select>  */}
			</div>
			<div>
				<select>
					<option value='0'>Order by</option>
					<option value='A-Z'>A to Z</option>
					<option value='Z-A'>Z to A </option>
					<option value='Min-Max'>Population Asc</option>
					<option value='Max-Min'>Population Des</option>
					</select>
				</div>
            </form>
        </div>
    )
}