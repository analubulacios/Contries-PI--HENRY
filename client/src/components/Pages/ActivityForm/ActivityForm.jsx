import React, { useState, useEffect } from "react";
import { getCountries, addActivity } from '../../../redux/actions/index';
import { useDispatch, useSelector } from "react-redux";
import NavBar from "../../NavBar/NavBar";


export default function ActivityForm (){

    const dispatch = useDispatch();
    const arrayCountries = useSelector(state => state.countries);

    let countriesList = arrayCountries.map(c => {
        return ({
            name:c.name
        })
    });
	
    useEffect(()=>{
        dispatch(getCountries()) //cuando renderiza entran los paises //
    },[])
    
    const[ selected, setSelected ]= useState([])
    const [ errors, setErrors ] = useState({})
    const [ activity, setActivity ] = useState({
		name: '',
		difficulty: '',
		duration: '',
		season: '',
		countries: [],})

    

	const validate = (activity) => {
		let errors = {}

		if (!activity.name) {
			errors.name = 'Name is required'
		}
    else if (!activity.duration) {
      errors.duration = 'Duration is required'
    }
    
    else if ( activity.duration > 24 || activity.duration < 1 ){
            errors.duration = 'Maximum duration from 1 to 24 hours'
		}
    else if (!activity.difficulty && activity.difficulty > 5 || activity.difficulty < 1){
            errors.difficulty = 'Maximum difficulty from 1 to 5'
		}
		else if (!activity.season) {
			errors.season = 'You must select at least one season'
		}
		else if (!activity.countries.length) {
			errors.countries = 'You must select at least one country'
		}
		return errors;
    };

    // useEffect(() => {
		// setErrors(validate(activity))
	  // }, [ activity ])
	
    const handleChange = (e) => {
        setActivity({
          ...activity,
          [e.target.name]: e.target.value
        })
        setErrors(validate({
            ...activity,
            [e.target.name]: e.target.value
          }))
    };

    const handleSeasons = (e) => {
        if (e.target.value !== 'Select' && !activity.season.includes(e.target.value)) {
          setActivity({
            ...activity,
            season: e.target.value
          })
        }
            setErrors(validate({
              ...activity,
              season: e.target.value
            }))
        }

    const handleCountries = (e) => {
        if (e.target.value !== 'Select' && !activity.countries.includes(e.target.value)) {
          setActivity({
            ...activity,
            countries: [...activity.countries, e.target.value]
          })
        }
        if (!selected.includes(e.target.value)){ setSelected(c => [...c,e.target.value])} 
        setErrors(validate({
              ...activity,
              countries: [...activity.countries, e.target.value]
            }))
      };

    const deleteCountry = (c) => {
        setActivity({
          ...activity,
          countries: activity.countries.filter(country => country !== c)
        })
        // setErrors(validate({
        //     ...activity,
        //     countries: activity.countries.filter(country => country !== c)
        //   }))
      };
    
    const handleSubmit = (e) => {
		  e.preventDefault()
		  dispatch(addActivity(activity))
      alert('Activity added successfully!')
      // console.log('chinguiro', activity)
        setActivity({
            name: '',
            difficulty: '',
            duration: '',
            season: '',
            countries: []

        })
	};
         
    return (
        <>
        <NavBar/>
        <div>
            <h1>CREATE NEW ACTIVITY</h1>
                <form 
                onSubmit={e=>handleSubmit(e)}>
                    <div>
                        <h2>Form:</h2>
                            <div>
								    <label>Name:</label>
									      <input 
                           autoComplete='off' 
                           onChange={e=>handleChange(e)} 
                           type='text' 
                           name='name' 
                           value={activity.name}
                           placeholder='Activity Name' />
                           {errors.name && <div>{errors.name}</div> }
                        
                    </div>         
                            
                            <div>
                                <label>Duration (in hours):</label>
                                <input
                                    type='text'
                                    name='duration'
                                    value={activity.duration}
                                    onChange={e => handleChange(e)}
                                    autoComplete='off'
                                    placeholder='Duration Format: 24hs' />
                                    {errors.duration && <div>{errors.duration}</div>}
                           </div>
                           <div>
                                <label>Select season:</label>
                                    <select
                                    name="season"
                              
                                    onChange={e => handleSeasons(e)}
                                    >
                                        <option value="Autumn">Autumn</option>
                                        <option value="Winter">Winter</option>
                                        <option value="Spring">Spring</option>
                                        <option value="Summer">Summer</option>
                                    </select>
                                    {errors.season && <div>{errors.season}</div>}
                           </div>
                            <div>
                                <label>Difficulty:</label>
                                <input
                                    type='text'
                                    name='difficulty'
                                    value={activity.difficulty}
                                    onChange={e => handleChange(e)}
                                    autoComplete='off'
                                    placeholder='Difficulty 1 to 5'
                                    />
                                    {errors.difficulty && <div>{errors.difficulty}</div>}
                            </div>
                            <div>
                            <label>Select:</label>
                            <select defaultValue={'default'} name="NombrePais" onChange={e=>handleCountries(e)}>
                            <option value="default" disabled>Select country</option>
                            {countriesList?.map(c=>(
                                <option value={c.name}>{c.name}</option>
                            ))}
                        </select>
                             {errors.countries && <p>{errors.countries}</p>}
                            </div>
                            <div className="displayCountries">
                                {activity.countries.map((country) => {
                                //  console.log(country)
                                     return (
                                         <div key={country}>
                                            <p>{country}</p>
                                                <button type='button' onClick={e => { deleteCountry(country) }}>X</button>
                                        </div>
                                    )
                                })}
                            </div>
                            <div>
                            <button
                                type='submit'            
                                disabled={errors.name ||
                                errors.activity ||
                                errors.duration ||
                                errors.season ||
                                errors.countries } >Add Activity</button>
  
                             </div>
                            
                    </div>



            </form>

        </div>
      </>

      )
 }



