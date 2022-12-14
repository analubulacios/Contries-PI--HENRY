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
            newActivity.id,{
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

module.exports = { newActivity }



















//     try {
//         const { name, difficulty, duration, season, countryId } = req.body;
//         const recordActivity = await Activity.findOne({
//             where: {
//               name: name,
//             },
//             include: {
//                 model: Country,  
//             },
//         });

//         if (recordActivity) {
//             return res.status(200).json(recordActivity)
//         } else {
//         const newActivity = await Activity.create({
//             name: name,
//             difficulty: difficulty,
//             duration: duration,
//             season: season,   
//         })
//         return res.status(200).json(newActivity);
//         }    
        
//     } catch (error) {
//         res.status(400).json(error);
//     }
// };


