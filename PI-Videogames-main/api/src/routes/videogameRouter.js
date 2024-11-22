const {Router} = require('express')
const router = Router()
const dbUtils = require('../common/getGamesFromDb')
const apiUtils = require('../common/getGamesFromApi')
const { PAGES_FOR_API_COUNT_LIMIT } = require('../common/constants')

router.get('/all', async(req, res)=>{
    const {game_name, page} = req.query
    try {
        const dbGamesAmount = await dbUtils.getCountGamesFromDb(game_name)
        let games = []
        let count = dbGamesAmount
        const dbGames = page >= PAGES_FOR_API_COUNT_LIMIT ? await dbUtils.getGamesFromDb(game_name, page) : null
        const justForCount = page > PAGES_FOR_API_COUNT_LIMIT
        const apiGames = await apiUtils.getGamesFromApi(game_name, page, justForCount)
        count += apiGames.count
        if (page == PAGES_FOR_API_COUNT_LIMIT){
            games = [...apiGames.games, ...dbGames.games]
        }
        else if (page < PAGES_FOR_API_COUNT_LIMIT){
            games = apiGames.games
        }
        else if (page > PAGES_FOR_API_COUNT_LIMIT){
            games = dbGames.games
        }
        
        res.json({
            games,
            count
        })
    } catch (error) {
        console.error(error);
        res.status(500).json(error.message)
    }
})

router.get('/api', async(req, res) => {
    const {gameName, page} = req.query
    try {
        const apiGames = await apiUtils.getGamesFromApi(gameName, page)
        res.json(apiGames)
    } catch (error) {
        res.status(500).json(error)
    }
})

router.get('/api/:id', async (req, res)=>{
    try{
        const {id} = req.params
        const game = await apiUtils.getApiGameById(id)
        res.json(game)
    }
    catch(error){
        res.status(500).json(error)
    }
})

module.exports = router