const { Router } = require('express');
const countryRoutes = require ('./CountryR.js');
const activityRoutes = require ('./ActivityR.js');



// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/countries', countryRoutes); 
router.use('/activities', activityRoutes);




module.exports = router;



