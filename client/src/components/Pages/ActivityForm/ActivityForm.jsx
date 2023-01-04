import React, { useState, useEffect } from "react";
import { getCountries, addActivity } from '../../../redux/actions/index';
import { useDispatch, useSelector } from "react-redux";


export default function ActivityForm (){

    const dispatch = useDispatch();
    const arrayCountries = useSelector(state => state.countries);

    let countriesList = arrayCountries.map(c => {
        return ({
            name:c.name
        })
    });
	
    useEffect(()=>{
        dispatch(getCountries()) 
    },[dispatch])
    
    const[ selected, setSelected ]= useState([])
    const [ errors, setErrors ] = useState({})
    const [ activity, setActivity ] = useState({
		name: '',
		difficulty: '',
		duration: '',
		season: '',
		countries: [],
	})

    useEffect(() => {
		setErrors(validate(activity))
	}, [ activity ])

	const validate = (activity) => {
		let errors = {}

		if (!activity.name) {
			errors.name = 'Name is required'
		}
        if(activity.duration > 24 || activity.duration < 1 ){
            errors.duration = 'Maximum duration from 1 to 24 hours'
		}
        if(activity.difficulty > 5 || activity.difficulty < 1){
            errors.difficulty = 'Maximum difficulty from 1 to 5'
		}
		if (!activity.seasons.length) {
			errors.season = 'You must select at least one season'
		}
		if (!activity.countries.length) {
			errors.countries = 'You must select at least one country'
		}
		return errors;
    };
	
    const handleChange = (e) => {
        setActivity({
          ...activity,
          [e.target.name]: e.target.value
        });
        if (!errors) {
          setErrors(validate({
            ...activity,
            [e.target.name]: e.target.value
          }))
        }
      };

    const handleSeasons = (e) => {
        if (e.target.value !== 'Select' && !activity.season.includes(e.target.value)) {
          setActivity({
            ...activity,
            season: e.target.value
          })
          if (!errors) {
            setErrors(validate({
              ...activity,
              season: e.target.value
            }))
          }
        }
      };

    const handleCountries = (e) => {
        if (e.target.value !== 'Select' && !activity.countries.includes(e.target.value)) {
          setActivity({
            ...activity,
            countries: [...activity.countries, e.target.value]
          })
          if (!errors) {
            setErrors(validate({
              ...activity,
              countries: [...activity.countries, e.target.value]
            }))
          }
        }
      };

    const deleteCountry = (e) => {
        setActivity({
          ...activity,
          countries: activity.countries.filter(country => country !== e.target.value)
        })
        if (!errors.firstTry) {
          setErrors(validate({
            ...activity,
            countries: activity.countries.filter(country => country !== e.target.value)
          }))
        }
      };
    
    const handleSubmit = async (e) => {
		e.preventDefault()
		try {
			const a = addActivity(activity)
			alert(`Activity ${a.name} added successfully!`);
		} catch (error) {
			alert(error)
		}
	};
         
    return (

        <div>
            <h1>CREATE NEW ACTIVITY</h1>
                <form 
                onSubmit={e=>handleSubmit(e)}>
                    <div>
                        <h2>Form:</h2>
                            <div>
								<label>Name:</label>
									<input 
                                    autocomplete='off' 
                                    onChange={e=>handleChange(e)} 
                                    type='text' 
                                    name='name' 
                                    value={activity.name}
                                    placeholder='Activity Name' />
                                    {errors.name && (<p>{errors.name}</p>)}
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
                                    {errors.duration && (<p>{errors.duration}</p>)}
                           </div>
                           <div>
                                <label>Select season:</label>
                                    <select
                                    name="season"
                                    value={activity.season}
                                    onChange={e => handleSeasons(e)}
                                    >
                                        <option value="Autumn">Autumn</option>
                                        <option value="Winter">Winter</option>
                                        <option value="Spring">Spring</option>
                                        <option value="Summer">Summer</option>
                                    </select>
                                    {errors.season && (<p>{errors.season}</p>)}
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
                                    {errors.difficulty && (<p>{errors.difficulty}</p>)}
                            </div>
                            <div>
                            <label>Select:</label>
                            <select 
                            value={selected} 
                            onChange={e => [handleCountries(e), setSelected(e)]}>
                                        <option>Countries:</option>
                                        {countriesList?.map(c => {
                                            return (
                                        <option key={c.name}>
                                             {c.name}
                                        </option>
                                            )
                                        })};
                             </select>
                             {errors.countries && (<p>{errors.countries}</p>)}
                            </div>
                            <div className="displayCountries">
                                {activity.countries.map((country) => {
                                 console.log(country)
                                     return (
                                         <div key={country}>
                                            <p>{country}</p>
                                                <button onClick={e => { deleteCountry(e) }} value={country}>Delete Country</button>
                                        </div>
                                    )
                                })}
                            </div>
                            <div>
                                {/* {!errors.name ||
                                !errors.activity ||
                                !errors.duration ||
                                !errors.season ||
                                !errors.countries ?
                                     <button >Add Activity</button>
                                         : <button onClick={e => handleCheckErrors(e)}>Add Activity</button>} */}
                             </div>
                            
                    </div>



            </form>

        </div>


    )

};



