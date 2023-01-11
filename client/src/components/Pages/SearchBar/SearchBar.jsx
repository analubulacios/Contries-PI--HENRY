import React from 'react'
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getCountryByName, getCountries } from '../../../redux/actions';
import style from './SearchBar.module.css';


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
            <div className={style.inputsContainer}>
                <form  onSubmit={onClickHandler}>
                    <input
                        className={style.inputText}
                        type='text'
                        placeholder='Search by name'
                        name='input'
                        value={input}
                        autoComplete='off'
                        onChange={(e) => inputHandler(e)}
                    />
                    <div>
                        <button className={style.srctBtn} type='submit' >
                            Search
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}


