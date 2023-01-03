import axios from 'axios';

import {
    GET_COUNTRIES,
    SET_PAGINATION,
    GET_COUNTRIES_BY_NAME,
    GET_COUNTRYDETAIL,
    FILTER_BY_CONTINENT,
} from '../constants/index.js';



export function getCountries() {
    return async (dispatch) => {
      let json = await axios.get(
        'http://localhost:3001/countries/');
      dispatch({ type: GET_COUNTRIES, payload: json.data });
    };
  };

export function setPagination(payload) {
    return {
      type: SET_PAGINATION,
      payload: payload,
      
    };
  };

export function getCountryByName(name) {
  return async (dispatch) => {
    try {
      const json = await axios.get(
        `http://localhost:3001/countries?name=${name}`);
      dispatch({ type: GET_COUNTRIES_BY_NAME, payload: json.data });
    } catch (error) {
      console.log(error);
    }
  };
};

export function getCountrydetail(id) {
  console.log(id)
  return async (dispatch) => {
    const json = await axios.get(`http://localhost:3001/countries/${id}`);
    dispatch({ type: GET_COUNTRYDETAIL, payload: json.data });
    console.log(json.data);
  };
};

export function filterByContinent(payload) {
  return {
    type: FILTER_BY_CONTINENT,
    payload: payload, 
  };
};




