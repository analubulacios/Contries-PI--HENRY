const { Router } = require('express');
const countryRoutes = require ('./CountryR.js');
//const activityRoutes = require ('./ActivityR.js');



// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/countries', countryRoutes); 
//router.use('/activities', activityRoutes);




module.exports = router;



//porque aync await ?
// como no sabemos cuanto demorara la respuesta tengo que avisarle que tiene que esperar la resppuesta antes de cargarla en la variable APIURL