const {Router} = require('express')
const router = Router()
const axios = require('axios')
const {API_KEY} = process.env
const urlApi = `https://api.rawg.io/api/games`

router.get('/', async(req, res)=>{
    const {gameName, page} = req.query
    
    if (!gameName){
        try{
            const apiGamesResponse = await axios.get(`${urlApi}?key=${API_KEY}&page=${page}&page_size=15`)
            const {
                results,
                count,
                next,
                previous
            } = apiGamesResponse.data
            
            let games = results.map((game) => {
                let formattedGame = {}
                formattedGame.id = game.id
                formattedGame.name = game.name
                formattedGame.released = game.released
                formattedGame.rating = game.rating
                let plataformas = game.platforms.map((gamePlat) => {
                    return gamePlat.platform.name
                })
                formattedGame.platforms = plataformas.toString()
                genres = game.genres.map(genre => {
                    return genre.name
                });
                formattedGame.genre = genres.toString()
                formattedGame.image = game.background_image
                return formattedGame
            })

            res.json({
                games,
                count: count > 100 ? 100 : count,
                next,
                previous
            }) 
        }
        catch(Err){
            res.send(Err.message)
        }
    }
    else{
        results = await axios.get(`${urlApi}?key=${API_KEY}&search=${gameName}`)
        results = results.data
        // res.send(results.results.map(e => e.name))
        let games = results.results.map(function(e){
            var obj = {}
            obj.id = e.id
            obj.name = e.name
            obj.released = e.released
            obj.rating = e.rating
            let plataformas = e.platforms.map(function(e){
                return e.platform.name
            })
            obj.platforms = plataformas.toString()
            genres = e.genres.map(genre => {
                return genre.name
            });
            obj.genre = genres.toString()
            obj.image = e.background_image
            return obj
        })
        games = games.slice(0,15)
        games.length > 0? res.send(games) : res.send('Any game was finded whit that name')
    }
})

router.get('/:id', async (req, res)=>{
    try{
        const {id} = req.params
        results = await axios.get(`${urlApi}/${id}?key=${API_KEY}`)
        results = results.data
        let obj = {}
        obj.image = results.background_image
        obj.name = results.name
        genres = results.genres.map(genre => {
            return genre.name
        });
        obj.genre = genres.toString()
        obj.description = results.description_raw
        obj.releaseDate = results.released
        obj.rating = results.rating
        platforms = results.platforms.map(element => {
            return element.platform.name
        });
        obj.platforms = platforms.toString()
        obj.created = false
        res.json(obj)
    }
    catch(err){
        res.send(err.message)
    }
})

module.exports = router