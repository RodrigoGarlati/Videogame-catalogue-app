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
    req.body.platforms = req.body.platforms.toString()
    req.body.genre = req.body.genre.toString()
  

    if (!req.body.id || !req.body.name || !req.body.description || !req.body.platforms) res.status(404).send(`Necessary data is missing`)
    else{
        try{
            game = await Videogame.create(req.body)
            res.json(game)
        }
        catch(err){
            console.log(err.message)
            res.status(400).json({error: err.message})
        }
    }
})

router.put('/:id', async(req,res) => {
    const {id} = req.params
    const {toChange, newValue} = req.body

    let promises = []

    for (let i = 0; i < toChange.length; i++){
        const change = Videogame.update({[toChange[i]]: newValue[i]} ,{where: {id: id}})
        promises.push(change)
    }

    try{
        await Promise.all(promises)
        res.send('Game edited succesfuly')
    }
    catch(err){
        res.status(400).send(err.message)
    }

})

router.delete('/:id', async(req, res) =>{
    const {id} = req.params
    try{
        await Videogame.destroy({
            where: {id: id}
        })
        res.send('The game has been deleted succesfuly')
    }
    catch(err){
        res.status(400).send(err.message)
    }

})


module.exports = router;