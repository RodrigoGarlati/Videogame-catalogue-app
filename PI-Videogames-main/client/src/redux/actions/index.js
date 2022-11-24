const axios = require('axios').default;

export const GET_ALL_GAMES = 'GET_ALL_GAMES';
export const ORDER_GAMES = 'ORDER_GAMES'
export const GET_CREATED_GAMES = 'GET_CREATED_GAMES';
export const GET_PRE_GAMES = 'GET_PRE_GAMES';
export const GET_GAME_DETAIL = 'GET_GAME_DETAIL';
export const SEARCH_GAMES = 'SEARCH_GAMES'
export const GET_ALL_GENRES = 'GET_ALL_GENRES';
export const GET_CREATED_GENRES = 'GET_CREATED_GENRES';
export const GET_PRE_GENRES = 'GET_PRE_GENRES'
export const CREATE_GAME = 'CREATE_GAME';
export const DELETE_GAME = 'DELETE_GAME';
export const EDIT_GAME = 'EDIT_GAME';
export const CREATE_GENRE = 'CREATE_GENRE';
export const FILTER_GAMES = 'FILTER_GAMES';

export function getAllGames(){
    return async (dispatch) => {
        let promises = []
        promises.push(axios.get('http://localhost:3001/api/videogames'))
        promises.push(axios.get("http://localhost:3001/db/videogames"))
        Promise.all(promises).then(function(res){
            dispatch({type: GET_ALL_GAMES , payload: res[0].data.concat(res[1].data)})
        })
    }
}

export function orderGames(parameters){
    return(dispatch) => {
        dispatch({type: ORDER_GAMES, payload: parameters})
    }
}

export function filterGames(filter){
    return(dispatch) => {
        dispatch({type: FILTER_GAMES, payload: filter})
    }
}

export function getCreatedGames(){
    return (dispatch) => {
        axios.get("http://localhost:3001/db/videogames")
        .then(res => dispatch({type: GET_CREATED_GAMES, payload: res.data}))
    }
}

export function getPreGames(){
    return (dispatch) => {
        axios.get('http://localhost:3001/api/videogames')
        .then(res => dispatch({type: GET_PRE_GAMES, payload: res.data}))
    }
}

export function getGameDetail(gameId){
    return (dispatch) => {
        if (gameId.length == 36){
            axios.get(`http://localhost:3001/db/videogames/${gameId}`)
            .then(res => dispatch({type: GET_GAME_DETAIL, payload: res.data}))
        }
        else{
            axios.get(`http://localhost:3001/api/videogames/${gameId}`)
            .then(res => dispatch({type:GET_GAME_DETAIL, payload: res.data}))
        }
    }   
}

export function createGame(newGame){
    return (dispatch) => {
        axios.post(`http://localhost:3001/db/videogames`, newGame)
        .then(res => dispatch({type: CREATE_GAME, payload: res.data}))
    }
}

export function deleteGames(id){
    return (dispatch) => {
        axios.delete(`http://localhost:3001/db/videogames/${id}`)
        .then(res => dispatch({type: DELETE_GAME, payload: res.data}))
    }
}

export function editGames(id, toChange, newValue){
    return (dispatch) => {
        axios.put(`http://localhost:3001/db/videogames/${id}`, {toChange, newValue})
        .then(res => dispatch({type: EDIT_GAME, payload: res.data}))
    }
}


export function searchGames(game){
    return (dispatch) => {
        let promises = []
        promises.push(axios.get(`http://localhost:3001/api/videogames?gameName=${game}`))
        promises.push(axios.get(`http://localhost:3001/db/videogames?name=${game}`))
        Promise.all(promises).then(function(res){
            dispatch({type: SEARCH_GAMES , payload: res[0].data.concat(res[1].data)})
        })
    }
}


export function getAllGenres(){
    return(dispatch) => {
        axios.get("http://localhost:3001/db/genres/initial")
        .then(res => dispatch({type: GET_ALL_GENRES, payload: res.data}))
    }
}

export function createGenre(newGenre){
    return (dispatch) => {
        axios.post("http://localhost:3001/db/genres", newGenre)
        .then(res => dispatch({type: CREATE_GENRE, payload: res.data}))
    }
}