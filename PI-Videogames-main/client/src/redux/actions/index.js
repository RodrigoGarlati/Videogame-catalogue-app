const axios = require('axios').default;
const { REACT_APP_API_URL } = process.env 

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
export const SWITCH_LOADER = 'SWITCH_LOADER';

export function getAllGames(page){
    return async (dispatch) => {
        axios.get(`${REACT_APP_API_URL}/videogames/all?page=${page}`)
        .then(res => 
            dispatch({type: GET_ALL_GAMES , payload: {
                    games: res.data.games,
                    count: res.data.count
                }
            })
        )
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

export function getCreatedGames(page){
    return (dispatch) => {
        axios.get(`${REACT_APP_API_URL}/db/videogames?page=${page}`)
        .then(res => dispatch({type: GET_CREATED_GAMES, payload: {
                games: res.data.games,
                count: res.data.count
            }
        }))
    }
}

export function getPreGames(page){
    return (dispatch) => {
        axios.get(`${REACT_APP_API_URL}/videogames/api?page=${page}`)
        .then(res => 
            dispatch({type: GET_PRE_GAMES, payload: {
                games: res.data.games,
                count: res.data.count
            }
        }))
    }
}

export function getGameDetail(gameId){
    return (dispatch) => {
        if (gameId.length == 36){
            axios.get(`${REACT_APP_API_URL}/db/videogames/${gameId}`)
            .then(res => dispatch({type: GET_GAME_DETAIL, payload: res.data}))
        }
        else{
            axios.get(`${REACT_APP_API_URL}/videogames/api/${gameId}`)
            .then(res => dispatch({type:GET_GAME_DETAIL, payload: res.data}))
        }
    }   
}

export function createGame(newGame){
    return (dispatch) => {
        axios.post(`${REACT_APP_API_URL}/db/videogames`, newGame)
        .then(res => dispatch({type: CREATE_GAME, payload: res.data}))
    }
}

export function deleteGames(id){
    return (dispatch) => {
        axios.delete(`${REACT_APP_API_URL}/db/videogames/${id}`)
        .then(res => dispatch({type: DELETE_GAME, payload: res.data}))
    }
}

export function editGames(id, newValues){
    return (dispatch) => {
        axios.put(`${REACT_APP_API_URL}/db/videogames/${id}`, {newValues})
        .then(res => dispatch({type: EDIT_GAME, payload: res.data}))
    }
}


export function searchGames(page, game){
    return (dispatch) => {
        axios.get(`${REACT_APP_API_URL}/videogames/all?page=${page}&game_name=${game}`)
        .then(res => 
            dispatch({type: GET_ALL_GAMES , payload: {
                    games: res.data.games,
                    count: res.data.count
                }
            })
        )
    }
}


export function getAllGenres(){
    return(dispatch) => {
        axios.get(`${REACT_APP_API_URL}/db/genres/initial`)
        .then(res => dispatch({type: GET_ALL_GENRES, payload: res.data}))
    }
}

export function createGenre(newGenre){
    return (dispatch) => {
        axios.post(`${REACT_APP_API_URL}/db/genres`, newGenre)
        .then(res => dispatch({type: CREATE_GENRE, payload: res.data}))
    }
}

export function loader(value){
    return(dispatch) => {
        dispatch({type: SWITCH_LOADER, payload: value})
    }
}