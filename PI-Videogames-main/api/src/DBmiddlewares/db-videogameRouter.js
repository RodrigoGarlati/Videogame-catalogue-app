const {Router} = require('express');
const router = Router();
const {Op, Videogame} = require('../db')

router.get('/', async (req, res)=>{
    const {name} = req.query
    if (!name){
        try{
            let games = await Videogame.findAll()
            res.json(games)
        }
        catch(err){
            res.status(400).json({error: err.message})
        }
    }
    else{
        try{
            let games = await Videogame.findAll({where: {name: {[Op.like]: `%${name}%`}}})
            games = games.slice(0,14)
            res.json(games)
        }
        catch(err){
            res.status(400).json({error: err.message})
        }
    }
    
})

router.get('/:id', async (req, res)=>{
    const {id} = req.params

    try{
        let game = await Videogame.findByPk(id)
        
        res.send(game)
    }
    catch(err){
        res.status(404).json({error: err.message})
    }
})

router.post('/', async (req, res)=>{
    const {id, name, description, platforms} = req.body

    if (!id || !name || !description || !platforms) res.status(404).send(`Faltan datos obligatorios.`)

    try{
        game = await Videogame.create(req.body)
        res.json(game)
    }
    catch(err){
        console.log(err.message)
        res.status(400).json({error: err.message})
    }
})


module.exports = router;