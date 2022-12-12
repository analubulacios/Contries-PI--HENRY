const { Sequelize , Op } = require ('sequelize');
const axios = require ('axios');
const { Country, Activity } = require ('../db');

// llamo con el endpoint de la api toda la info que necesito para cargarla en mi base de datos.


const getApiInfo = async () => {
    const apiUrl = await axios.get('https://restcountries.com/v3/all');
    const apiInfo = await apiUrl.data;

const bdinfo = apiInfo.map(async (e)=> {
    await Country.findOrCreate({
        where: {
            name : e.name.common,
            id: e.cca3,
            capital:e.capital ? e.capital : null,
            flags: e.flags ?  e.flags : null,
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
        include: {
            model:Activity 
        } // agregar atributes
    })
    if (allCountries.length === 0) {
        return res.status(404)
        .json({statusText:"No se encuentran países con ese nombre"})
    } 
        return res.json(allCountries);
    } else {
      allCountries = await Country.findAll({
        include: {
            model:Activity, 
        }
        // agregar atributes 
      })
      return res.json(allCountries)
   }
    
} catch (error) {
    res.status(400)
    .json(error);
}
};

async function getCountryId(req, res) {
    try {
      const idPais = req.params.idPais.toUpperCase();
      // console.log(idPais)
      const country = await Country.findByPk(
        idPais, 
        {
        include: {
        model: Activity,
        },

  });
     if (country === null) {
        return res.status(404).json({statusText:"No se encuentran países con ese id"})
     }
      return res.json(country);

    } catch (error) {
      res.status(400).json(error);
    }
  }
module.exports = {  getAllCountries , getCountryId  };