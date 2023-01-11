import React, { useState, useEffect, useRef } from "react";
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
    
  
    const [ errors, setErrors ] = useState({});
    const [ activity, setActivity ] = useState({
		name: '',
		difficulty: '',
		duration: '',
		season: '',
		countries: [],});
    const [isModified,setisModified] = useState(false);
    const refCountry = useRef()
    const refSeason = useRef()
    

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
      
    };

    const handleCountries = (e) => {
        setisModified(true)
        if (e.target.value !== 'Select' && !activity.countries.includes(e.target.value)) {
          setActivity({
            ...activity,
            countries: [...activity.countries, e.target.value]
          })
        }    
        setErrors(validate({
              ...activity,
              countries: [...activity.countries, e.target.value]
            }))
      
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
      setisModified(false);
      refCountry.current.selectedIndex = 0;
      refSeason.current.selectedIndex = 0;
	};
         
    return (
      <>
        <div className={style.containertotal}>
          <div>
            <NavBar/>
          </div>  
              <div className={style.containerform}>
                <h1>Create new activity:</h1>
                    <form onSubmit={e=>handleSubmit(e)}>                      
                        <div className={style.form}>                   
                          <div className={style.fields}>

                            <div className={style.field}>
                              <p>Name:</p>
                                <input 
                                  autoComplete='off' 
                                  onChange={e=>handleChange(e)} 
                                  type='text' 
                                  name='name' 
                                  value={activity.name}
                                  placeholder='Activity name...' />
                                  {errors.name && <span> {errors.name}</span> }
                          </div>  
                                   
                          <div className={style.field}>        
                              <p>Duration (in hours):</p>
                                <input
                                  type='text'
                                  name='duration'
                                  value={activity.duration}
                                  onChange={e => handleChange(e)}
                                  autoComplete='off'
                                  placeholder='Duration format: 24hs' />
                                  {errors.duration && <span>{errors.duration}</span>}                       
                          </div>
                            
                          <div className={style.field}>
                              <p>Select season:</p>
                                <select
                                  defaultValue={'Select'}
                                  name='Season'                              
                                  onChange={e => handleSeasons(e)}
                                  ref={refSeason}
                                  >
                                    <option value='Select' disabled>Select an option</option>
                                    <option value='Autumn'>Autumn</option>
                                    <option value='Winter'>Winter</option>
                                    <option value='Spring'>Spring</option>
                                    <option value='Summer'>Summer</option>   
                                </select>
                                    {errors.season && <span>{errors.season}</span>}             
                          </div>
                            
                          <div className={style.field}>
                              <p>Difficulty:</p>
                                <input
                                type='text'
                                name='difficulty'
                                value={activity.difficulty}
                                onChange={e => handleChange(e)}
                                autoComplete='off'
                                placeholder='Difficulty 1 to 5'
                                />
                                {errors.difficulty && <span>{errors.difficulty}</span>}            
                          </div>
                          <div className={style.field} >
                              <p> Select countries:</p>
                                <select defaultValue={'select'} name='country name' onChange={e=>handleCountries(e)} ref={refCountry}>
                                  <option value='select' disabled>Select an option</option>
                                  {countriesList?.map(c=>(
                                    <option value={c.name} key={c.name}>{c.name}</option>
                                  ))}
                                </select>
                                  {errors.countries && <span>{errors.countries}</span>}
                          </div>
                          <p className={style.listCountries}> Countries:</p>
                          <div className={style.displayCountries}>
                               
                                  {activity.countries.map((country) => {
                                  return ( 
                                    <div key={country} className={style.country}>
                                      <p>{country}</p>                                                                             
                                      <button className={style.bttonsec}onClick={e => { deleteCountry(country) }}>✕</button>
                                    </div>         
                                  )
                                })}                                            
                            </div>
                            <div>
                              <button className={style.bttonprim}
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



