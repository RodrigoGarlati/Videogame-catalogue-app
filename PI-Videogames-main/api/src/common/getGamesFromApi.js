const axios = require('axios')
const { API_COUNT_LIMIT, PAGES_FOR_API_COUNT_LIMIT } = require('../common/constants')
const urlApi = `https://api.rawg.io/api/games`
const {API_KEY} = process.env

const getGamesFromApi = async (gameName, page, justForCount) => {
    try {
        let pageNumber = page || 1
        let pageSize = justForCount ? 1 : page !== PAGES_FOR_API_COUNT_LIMIT ? 15 : 10 
        const apiGamesResponse = await axios.get(`${urlApi}?key=${API_KEY}&page=${pageNumber}&page_size=${pageSize}${gameName ? '&search=' + gameName : ''}`)
        if (justForCount) return { count: apiGamesResponse.data.count > API_COUNT_LIMIT ? API_COUNT_LIMIT : apiGamesResponse.data.count }
        const formattedResponse = formatApiResponse(apiGamesResponse.data)
        return formattedResponse
    } catch (error) {
        throw new Error(error)
    }
}

const getApiGameById = async (id) => {
    try {
        const gameResponse = await axios.get(`${urlApi}/${id}?key=${API_KEY}`)
        const formattedResponse = formatGameObject([gameResponse.data])
        return formattedResponse[0]
    } catch (error) {
        throw new Error(error)
    }
}

const formatApiResponse = (apiResponse) => {
    const {
        results,
        count
    } = apiResponse
    
    let games = formatGameObject(results)

    return {
        games,
        count: count > API_COUNT_LIMIT ? API_COUNT_LIMIT : count
    }
}

const formatGameObject = (results) => {
    let games = results.map((game) => {
        let formattedGame = {...game}
        let plataformas = game.platforms.map((gamePlat) => {
            return gamePlat.platform.name
        })
        formattedGame.platforms = plataformas.toString()
        genres = game.genres.map(genre => {
            return genre.name
        });
        formattedGame.genre = genres.join(', ')
        formattedGame.image = game.background_image
        return formattedGame
    })

    return games
}

module.exports = { getGamesFromApi, getApiGameById }