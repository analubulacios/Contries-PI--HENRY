const { Sequelize , Op } = require ('sequelize');
const { Country, Activity } = require ('../db');

const newActivity = async (req, res) =>  { 

const { countriesname, name, difficulty, duration, season} = req.body;

    try{
        const newActivity = await Activity.create({
              name, difficulty, duration, season
        });

        const crecords = [];

        for ( let c of countriesname ) {
            let countryBydb = await Country.findOne ({
                where: {
                    name: {
                        [Op.iLike]:`%${c}%`
                    },
                },
            })
        crecords.push(countryBydb); 
        }
        
        for (let c of crecords ) {
            await newActivity.addCountry(c) 
            };
        
        const recordAct = await Activity.findByPk( 
            newActivity.id, {
            include: [{
                model: Country,

                through: { attributes: [] }
              }]
            })
    
        .then(newActivity => newActivity.toJSON())
        res.json(recordAct);

    }catch(error){
        res.status(400).send(error.message);
    }
};

module.exports = { newActivity };



















