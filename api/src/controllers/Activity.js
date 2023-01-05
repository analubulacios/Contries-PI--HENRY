const { Sequelize , Op } = require ('sequelize');
const { Country, Activity } = require ('../db');

const newActivity = async (req, res) =>  { 
console.log(req.body)
const { name, difficulty, duration, season, countries} = req.body;
 console.log('1' , name , '2 ', duration, '3', season , '4', countries)
    try{
        const newActivity = await Activity.create({
              name, difficulty, duration, season
        });

        const crecords = [];

        for ( let c of countries ) {
            let countryBydb = await Country.findOne ({
                where: {
                    name: {
                        [Op.iLike]:`%${c}%`
                    },
                },
            })
        crecords.push(countryBydb);
        }
       
        // (countryBydb){
        //     await newActivity.addCountry(c) 
        
        
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
    
        // .then(newActivity => newActivity.toJSON())
            res.json(recordAct);

    }catch(error){
        res.status(400).json(error);
    }
};

module.exports = { newActivity };



















