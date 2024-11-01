const {Router} = require('express');
const router = Router();
const { Videogame } = require('../db')
const { getGamesFromDb, getCountGamesFromDb } = require( '../common/getGamesFromDb');

router.get('/', async (req, res)=>{
    const {name, page} = req.query
    try {
        const dbGames = await getGamesFromDb(name, page, true)
        const countDbGames = await getCountGamesFromDb(name)
        res.json({
            games: dbGames.games,
            count: countDbGames
        })
    } catch (error) {
        res.status(500).json(error)
    }
})

router.get('/:id', async (req, res)=>{
    const {id} = req.params

    try{
        let game = await Videogame.findByPk(id)
        
        res.send(game)
    }
    catch(error){
        res.status(500).json(error)
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
        catch(error){
            console.log(err.message)
            res.status(500).json(error)
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