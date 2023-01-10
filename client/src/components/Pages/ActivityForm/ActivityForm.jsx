import React, { useState, useEffect } from "react";
import { getCountries, addActivity } from '../../../redux/actions/index';
import { useDispatch, useSelector } from "react-redux";
import NavBar from "../../NavBar/NavBar";
import style from './ActivityForm.module.css';

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
    },[])
    
    // const[ selected, setSelected ]= useState([]);
    const [ errors, setErrors ] = useState({});
    const [ activity, setActivity ] = useState({
		name: '',
		difficulty: '',
		duration: '',
		season: '',
		countries: [],});
    const [isModified,setisModified] = useState(false);

    

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
    else if (!activity.difficulty){
      errors.difficulty = 'Difficulty is required'
    }
      
    else if (activity.difficulty > 5 || activity.difficulty < 1){
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

   
	
    const handleChange = (e) => {
        setisModified(true);
        setActivity({
          ...activity,
          [e.target.name]: e.target.value
        })
        setErrors(validate({
            ...activity,
            [e.target.name]: e.target.value
          }))
        // handleDisable()
    };

    const handleSeasons = (e) => {
        setisModified(true)
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
        //  handleDisable()
    };

    const handleCountries = (e) => {
        setisModified(true)
        if (e.target.value !== 'Select' && !activity.countries.includes(e.target.value)) {
          setActivity({
            ...activity,
            countries: [...activity.countries, e.target.value]
          })
        }
        // if (!selected.includes(e.target.value)){ setSelected(c => [...c,e.target.value])} 
        setErrors(validate({
              ...activity,
              countries: [...activity.countries, e.target.value]
            }))
        // handleDisable() 
    };
      
      

    const deleteCountry = (c) => {
      setisModified(true)
        setActivity({
          ...activity,
          countries: activity.countries.filter(country => country !== c)
        })
        setErrors(validate({
            ...activity,
            countries: activity.countries.filter(country => country !== c)
          }))
      
    };

  
    
    const handleSubmit = (e) => {
		  e.preventDefault()
		  dispatch(addActivity(activity))
      alert('Activity added successfully!')
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
        <div className={style.containertotal}>
          <div>
            <NavBar/>
          </div>  
              <div className={style.containerform}>
                <h1>Create new Activity:</h1>
                    <form onSubmit={e=>handleSubmit(e)}>                      
                        <div className={style.form}>                   
                          <div className={style.fields}>
                            <div className={style.field}>
                              <label>Name:</label>
                                <input 
                                  autoComplete='off' 
                                  onChange={e=>handleChange(e)} 
                                  type='text' 
                                  name='name' 
                                  value={activity.name}
                                  placeholder='Activity Name' />
                                  {errors.name && <div className={style.error}>{errors.name}</div> }
                          </div>    
                                   
                          <div className={style.field}>        
                              <label>Duration (in hours):</label>
                                <input
                                  type='text'
                                  name='duration'
                                  value={activity.duration}
                                  onChange={e => handleChange(e)}
                                  autoComplete='off'
                                  placeholder='Duration Format: 24hs' />
                                  {errors.duration && <div className={style.error}>{errors.duration}</div>}                       
                          </div>
                            
                          <div className={style.field}>
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
                                    {errors.season && <div className={style.error}>{errors.season}</div>}             
                          </div>
                            
                          <div className={style.field}>
                              <label>Difficulty:</label>
                                <input
                                type='text'
                                name='difficulty'
                                value={activity.difficulty}
                                onChange={e => handleChange(e)}
                                autoComplete='off'
                                placeholder='Difficulty 1 to 5'
                                />
                                {errors.difficulty && <div className={style.error}>{errors.difficulty}</div>}            
                          </div>
                          <div className={style.field} >
                              <label>Countries:</label>
                                <select defaultValue={'default'} name="NombrePais" onChange={e=>handleCountries(e)}>
                                  <option value="default" disabled>Select an option</option>
                                  {countriesList?.map(c=>(
                                    <option value={c.name} key={c.name}>{c.name}</option>
                                  ))}
                                </select>
                                  {errors.countries && <div className={style.error}>{errors.countries}</div>}
                          </div>
                            
                          <div className={style.displayCountries}>
                                <h2>Countries Selected:</h2>
                                  {activity.countries.map((country) => {
                                  return (
                                    <div key={country} className={style.country}>
                                        <p>{country}</p>
                                    
                                    <button className={style.btonsecondary} onClick={e => { deleteCountry(country) }}>X</button>
                                    </div>
                                  )
                                })}                                            
                            </div>
                            <div>
                              <button
                                type='submit'            
                                disabled={Object.keys(errors).length !== 0 || !isModified} >Add Activity</button>
                            </div>                            
                          </div>
                        </div>  
                </form>
              </div>
        </div>    
    </>

      )
 }



