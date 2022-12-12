const { Router } = require('express');
const { getAllCountries , getCountryId } = require('../controllers/Country.js')
const router= Router();

router.get('/', getAllCountries)  
router.get('/:idPais', getCountryId)  

module.exports = router;









