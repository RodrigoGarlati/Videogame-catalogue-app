const {Router} = require('express');
const router = Router();
const {Genre} = require('../db');
const getGenresUtils = require('../common/getGenresFromApi')

router.get('/initial', async (req, res)=>{
        try{
            const apiGenres = await getGenresUtils.getGenresFromApi()
            const createdGenres = await Genre.findAll()
            const allGenres = [...createdGenres, ...apiGenres] 
            res.json(allGenres)
        }
        catch(err){
            console.log(err.message)
            res.status(404).json({error: err.message})
        }
        
})

router.post('/', async (req, res)=> {
    const {id, name} = req.body

    if (!id || !name) res.status(404).send('Necessary data is missing')
    else{
        try{
            let genre = await Genre.create(req.body)
            res.json(genre)
        }
        catch(err){
            res.status(400).json({error: err.message})
        }
    }
})

module.exports = router