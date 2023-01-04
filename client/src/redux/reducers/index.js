import {
    GET_COUNTRIES,
    SET_PAGINATION,
    GET_COUNTRIES_BY_NAME,
    GET_COUNTRYDETAIL,
    FILTER_BY_CONTINENT,
    FILTER_BY_ACTIVITY,
    ORDER_BY_NAME,
    ORDER_BY_POPULATION,
    ADD_ACTIVITY,
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
    activities: {},

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
          pages:Math.ceil(continentFiltered.length / countriesPerPage),
          currentPage: 1,
        }
      // case FILTER_BY_ACTIVITY:
      //   let countriesAll2 = state.allCountries;// consultar !!!
      //   const activityFiltered = action.payload === '0'? countriesAll2.filter(c => 
      //     c.activities.some(a => a.activity_id === action.values.activity)): countriesAll2.filter(c => !c.activities.some(a => a.activity_id === action.values.activity))
      //   return {
      //     ...state,
      //     countries: action.payload === '0'? state.countries : activityFiltered
      //   }

      case ORDER_BY_NAME:
        let countriesSortName = [...state.countries];
        let sortName = action.payload === 'A-Z'? 
         countriesSortName.sort(function (a, b) {
            if (a.name > b.name){
              return 1;
            }
            if (b.name > a.name) {
              return -1; 
            }
            return 0; //si son iguales los deja como estan 
          }):
          countriesSortName.sort(function (a, b) {
            if (a.name > b.name){
              return -1;
            }
            if (b.name > a.name){
              return 1;
            }
            return 0;
          });
          return {
            ...state,
            countries : sortName,
              pages:Math.ceil(sortName.length / countriesPerPage),
              currentPage: 1,
          }

      case ORDER_BY_POPULATION:
        let countriesSortPop = [...state.countries];
        let sortPop = action.payload === 'Min-Max'?
          countriesSortPop.sort(function(a, b){
            if (Number(a.population) < Number(b.population)) {
              return -1;
            }
            if (Number(b.population) < Number(a.population)) {
              return 1;
            }
          return 0;
          }):
          countriesSortPop.sort(function(a, b){
            if (Number(a.population) > Number(b.population)) {
              return -1;
          }
            if (Number(b.population) > Number(a.population)) {
              return 1;
          }
          return 0;
          })
          return {
            ...state,
            countries: sortPop,
            pages:Math.ceil(sortPop.length / countriesPerPage),
            currentPage: 1,
          }
        case ADD_ACTIVITY:
          return {
            ...state,
            activities: action.payload,
          }
                              
        default:
          return state;
      }
    };

export default rootReducer;