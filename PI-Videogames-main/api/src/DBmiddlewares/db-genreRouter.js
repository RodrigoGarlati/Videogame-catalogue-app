const {Router} = require('express');
const router = Router();
const axios = require('axios')
const {Op, Genre} = require('../db')



router.get('/initial', async (req, res)=>{
    try{
        let genres = await Genre.findAll()
        if (!genres.length){
            try{
                let genres = await axios.get('https://api.rawg.io/api/genres?key=460d82ec2eea4d12974d38b287551b0e')
                genres = genres.data.results
                let promises = genres.map(function(genre){
                    let obj = {}
                    obj.id = genre.id
                    obj.name = genre.name
                    obj.image = genre.image_background
                    obj.games = genre.games.slice(0,3).map(e => e.name).toString()  //saco los primeros tres, mapeo para sacar la propiedad name y lo paso a string porque es un array
                    obj.created = false 
                    return Genre.create(obj)
                })
                await Promise.all(promises) 
                res.json(await Genre.findAll())
            }
            catch(err){
                console.log(err.message)
                res.status(404).json({error: err.message})
            }
        }
        else{
            res.json(genres)
        }
    }
    catch(err){
        res.json({error: err.message})
    }
})

router.get('/', async (req, res)=>{
    try{
        let genres = await Genre.findAll()
        res.json(genres)
    }
    catch(err){
        res.status(400).json({error: err.message})
    }
})

router.post('/', async (req, res)=> {
    const {id, name} = req.body

    if (!id || !name) res.status(404).send('Faltan datos obligatorios.')
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