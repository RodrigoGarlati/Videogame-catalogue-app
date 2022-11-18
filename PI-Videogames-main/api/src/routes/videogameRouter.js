const {Router} = require('express')
const router = Router()
const axios = require('axios')
const api_key = '460d82ec2eea4d12974d38b287551b0e'
const urlApi = `https://api.rawg.io/api/games`

router.get('/', async(req, res)=>{
    const {gameName} = req.query
    
    if (!gameName){
        try{
            let games = []
            let next  
            let i = 0
            while (games.length < 100){
                console.log(games.length)
                console.log(games)
                !next? results = await axios.get(`${urlApi}?key=${api_key}`) : results = next
                results = results.data
                next = await axios.get(results.next)

                let game = results.results.map(function(e){
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
                
                    games = games.concat(game)
                }
            res.send(games) 
        }
        catch(Err){
            res.send(Err.message)
        }
    }
    else{
        results = await axios.get(`${urlApi}?key=${api_key}&search=${gameName}`)
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
        games.length > 0? res.send(games) : res.send('No se encontró ninguno con ese nombre')
    }
})

router.get('/:id', async (req, res)=>{
    try{
        const {id} = req.params
        results = await axios.get(`${urlApi}/${id}?key=${api_key}`)
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
        res.json(obj)
    }
    catch(err){
        res.send(err.message)
    }
})
// Obtener el detalle de un videojuego en particular
// Debe traer solo los datos pedidos en la ruta de detalle de videojuego
// Incluir los géneros asociados

// [ ] Los campos mostrados en la ruta principal para cada videojuegos (imagen, nombre, y géneros)
// [ ] Descripción
// [ ] Fecha de lanzamiento
// [ ] Rating
// [ ] Plataformas


module.exports = router