const axios = require('axios');
const { v4: uuidv4 } = require('uuid')
const {API_KEY} = process.env;
const API_URL = 'https://api.rawg.io/api/genres';

const getGenresFromApi = async () => {
    let genres = await axios.get(`${API_URL}?key=${API_KEY}`)
    genres = genres.data.results
    const formattedGenres = formatApiGenres(genres)
    return formattedGenres
}

const formatApiGenres = (genres) => {
    let formattedGenres = genres.map((genre) => {
        let obj = {}
        obj.id = uuidv4()
        obj.name = genre.name
        obj.image = genre.image_background
        obj.games = genre.games.slice(0,3).map(e => e.name).toString()  //saco los primeros tres, mapeo para sacar la propiedad name y lo paso a string porque es un array
        obj.created = false 
        return obj
    })

    return formattedGenres
}

module.exports = { getGenresFromApi }