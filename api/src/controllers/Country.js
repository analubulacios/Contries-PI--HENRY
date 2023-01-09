const { Sequelize , Op } = require ('sequelize');
const axios = require ('axios');
const { Country, Activity } = require ('../db');




const getApiInfo = async () => {
    const apiUrl = await axios.get('https://restcountries.com/v3/all');
    const apiInfo = await apiUrl.data;

const bdinfo = apiInfo.map(async (e)=> {
    await Country.findOrCreate({
        where: {
            name : e.name.common,
            id: e.cca3,
            flags: e.flags ? e.flags[0] : 'N/A',
            capital:e.capital ? e.capital[0] : 'N/A',
            continent: e.continents[0],
            subRegion: e.subregion ? e.subregion : 'N/A',
            area: e.area.toString(),
            population: e.population  
          } 
    })
})

return bdinfo;

}

const getAllCountries = async (req,res) => {
    
    let allCountries = [] ;

try {
    const records = await Country.count()
    if (records < 250) {
       allCountries = await getApiInfo()
    } 
    const name = req.query.name;
    if (name){
      allCountries = await Country.findAll({
        where: {
            name: {
                [Op.iLike]:`%${name}%`
            },
        },
        include: [{
          model: Activity,
          
          through: { attributes: [] }
        }]
      })
   
    if (allCountries.length === 0) {
        return res.status(404)
        .json({statusText:"No se encuentran países con ese nombre"})
    } 
        return res.json(allCountries);
    } else {
      allCountries = await Country.findAll({
        include: [{
          model: Activity,
          
          through: { attributes: [] }
        }]
      })
      return res.json(allCountries)
   }
    
} catch (error) {
    res.status(400)
    .json(error);
  }
};

const  getCountryId = async (req, res) => {
    try {
      const idPais = req.params.idPais.toUpperCase();
      const country = await Country.findByPk(
        idPais, 
        {include: [{
          model: Activity,
          
          through: { attributes: [] }
        }]
      })
     if (country === null) {
        return res.status(404).json({statusText:"No se encuentran países con ese id"})
     }
      return res.json(country);

    } catch (error) {
      res.status(400).json(error);
    }
  };

module.exports = {  getAllCountries , getCountryId  };