const {Router} = require('express');
const router = Router();
const axios = require('axios');
const {Genre} = require('../db');
const { v4: uuidv4 } = require('uuid')



router.get('/initial', async (req, res)=>{
        try{
            let genres = await axios.get('https://api.rawg.io/api/genres?key=460d82ec2eea4d12974d38b287551b0e')
            genres = genres.data.results
            let formattedGenres = genres.map((genre) => {
                let obj = {}
                obj.id = uuidv4()
                obj.name = genre.name
                obj.image = genre.image_background
                obj.games = genre.games.slice(0,3).map(e => e.name).toString()  //saco los primeros tres, mapeo para sacar la propiedad name y lo paso a string porque es un array
                obj.created = false 
                return obj
            })
            const createdGenres = await Genre.findAll()
            const allGenres = [...createdGenres, ...formattedGenres] 
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