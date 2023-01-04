import './App.css';
import { Route, Switch } from 'react-router-dom';
import LandingPage from './components/Pages/LandingPage/LandingPage.jsx';
import NavBar from './components/NavBar/NavBar.jsx';
import Home from './components/Pages/Home/Home.jsx';
import CountryDetail from  './components/Pages/CountryDetail/CountryDetails.jsx';
import ActivityForm from './components/Pages/ActivityForm/ActivityForm';

function App() {
  return (
    <Switch>
      <Route exact path='/' component={LandingPage}/>
      <Route exact path='/home' component={Home}/>
      <Route exact path='/country/:idPais' component={CountryDetail}/>
      <Route exact path='/activity' component={ActivityForm}/>
      {/* <Route path ='*' /> */}
	  </Switch>
  )
};

export default App;
