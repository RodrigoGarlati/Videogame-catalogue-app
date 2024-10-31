const {Op, Videogame} = require('../db')

const getGamesFromDb = async (name, page, onlyDbGames = false) => {
    try {
        let getWhere = {}
        if (name){
            getWhere.name = {[Op.like]: `%${name}%`}
        }
        const limit = onlyDbGames ? 15 : page == 7 ? 5 : 15
        const offset = onlyDbGames ? 15 * (page - 1) : getAllOffset(page)
        
        const games = await Videogame.findAll({where: getWhere, limit, offset})
        return {
            games
        }
    } catch (error) {
        throw new Error(error)
    }
}

const getCountGamesFromDb = async (name) => {
    try {
        let getWhere = {}
        if (name){
            getWhere.name = {[Op.like]: `%${name}%`}
        }
        let totalGames = await Videogame.count({where: getWhere})
        return totalGames
    } catch (error) {
        throw new Error(error)
    }
}

const getAllOffset = (page) => {
    return page > 7 ? 5 + (15 * (page - 8)): 0
}
module.exports = { getGamesFromDb, getCountGamesFromDb }