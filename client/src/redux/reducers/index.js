import {
    GET_COUNTRIES,
    SET_PAGINATION,
    GET_COUNTRIES_BY_NAME,
    GET_COUNTRYDETAIL,
    FILTER_BY_CONTINENT,
  } from '../constants/index.js';


const countriesPerPage = 10;

const initialState = {
    countries: [], 
    searchCountries: false,
    allCountries: [],                
    countryDetail: {},
    currentPage : 1,
    indexOfLastCountries: 10,
    indexOfFirstCountries: 0,
    pages: 1, 

  };
  
const rootReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_COUNTRIES:                  
        return {
          ...state,
          countries: action.payload,
          allCountries:action.payload,
          pages: Math.ceil(action.payload.length/countriesPerPage),
          searchCountries: false,
        }; 
      case SET_PAGINATION:
        return {
          ...state,
          currentPage:action.payload,
          indexOfFirstCountries: (action.payload - 1 ) * countriesPerPage ,
          indexOfLastCountries: action.payload * countriesPerPage,
        };
      case GET_COUNTRIES_BY_NAME:
        return {
          ...state,
          searchCountries: true,
          countries: action.payload,
          pages: Math.ceil(action.payload.length/countriesPerPage),
          currentPage: 1,
      
        };

      case GET_COUNTRYDETAIL:
        return {
          ...state,
          countryDetail: action.payload,
        }
      case FILTER_BY_CONTINENT:
        let countriesAll = state.allCountries;
        const continentFiltered = action.payload ==='0'? countriesAll: countriesAll.filter(c=> c.continent === action.payload)
        return {
          ...state,
          countries: continentFiltered,
        }
                              
      default:
        return state;
      }
    };

export default rootReducer;