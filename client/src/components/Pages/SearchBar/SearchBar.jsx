import React from 'react'
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getCountryByName, getCountries } from '../../../redux/actions';
import './SearchBar.css';


export default function SearchBar() {

    const [input, setInput] = useState('');
    const dispatch = useDispatch();


    const onClickHandler = (e) => {
        e.preventDefault();
        input.length > 0 && dispatch(getCountryByName(input))
        setInput('');
     
    };
    const inputHandler = (e) => {
        e.preventDefault();
        setInput(e.target.value);
    };

    return (
        <div>
            <div className='inputsContainer'>
                <form onSubmit={onClickHandler}>
                    <input
                        className='inputText'
                        type='text'
                        placeholder='Search by name'
                        name='input'
                        value={input}
                        autocomplete='off'
                        onChange={(e) => inputHandler(e)}
                    />
                    <div>
                        <button className='srctBtn' type='submit' >
                            Search
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}


