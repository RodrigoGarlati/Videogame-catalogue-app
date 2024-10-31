const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const db_videogameRouter = require('../DBmiddlewares/db-videogameRouter')
const db_genreRouter = require('../DBmiddlewares/db-genreRouter')
const videogameRouter = require('./videogameRouter')
const axios = require('axios')



const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get('/', async(req, res)=>{
    a = await axios.get('https://api.rawg.io/api/games?key=460d82ec2eea4d12974d38b287551b0e')
    res.send(a.data)
})

router.use('/videogames', videogameRouter)
//router.use('api/genres', genreRouter)
router.use('/db/videogames', db_videogameRouter)
router.use('/db/genres', db_genreRouter)


module.exports = router;
