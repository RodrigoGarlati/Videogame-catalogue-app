
import {GET_PRE_GAMES, GET_ALL_GAMES, GET_ALL_GENRES, GET_CREATED_GAMES, GET_GAME_DETAIL,
     GET_INITIAL_GENRES, CREATE_GAME, CREATE_GENRE, SEARCH_GAMES, ORDER_GAMES} from '../actions'

const initialState = {
    Games: [],
    allGames: false,
    searchedGames: [],
    createGame: false,
    preGames: false,
    gameDetail: [], 
    allGenres: [],
    initialGenres: [],
    createGenre: {},
}

export default function superReducer(state = initialState, action){
    switch(action.type){
        case GET_ALL_GAMES:
            return{
                ...state,
                preGames: false,
                createdGames: false,
                allGames: true,
                Games: action.payload
            };
        case GET_INITIAL_GENRES:
            return{
                ...state,
                initialGenres: action.payload,
            };
        case GET_PRE_GAMES:
            return{
                ...state,
                allGames: false,
                createdGames: false,
                preGames: true,
                Games: action.payload
            };
        case GET_CREATED_GAMES:
            return{
                ...state,
                allGames: false,
                preGames: false,
                createdGames: true,
                Games: action.payload
            };
        case GET_GAME_DETAIL:
            if (!action.payload){
                return {
                    ...state,
                    gameDetail: 'Game not founded'
                }
            }
            else {
                return{
                    ...state,
                    gameDetail: action.payload
                }
            };
        case SEARCH_GAMES:
            return{
                ...state,
                searchedGames: action.payload
            };
        case CREATE_GAME:
            return{
                ...state,
                createdGames: [...state.createdGames, action.payload],
            };
        case CREATE_GENRE:
            return{
                ...state,
                createdGenres: [...state.createdGenres, action.payload],
            };
        case GET_ALL_GENRES:
            return{
                ...state,
                allGenres: action.payload
            };
        case ORDER_GAMES:
            let {order, orderBy} = action.payload
            if (!order){
                return{
                    ...state,
                    Games: []
                }
            }
            else if (orderBy === 'Rating'){
                if (order === 'Upward'){
                    return{
                        ...state,
                        Games: [...state.Games.sort((a,b)=>{return b.rating - a.rating})]
                    }
                }
                else{
                    return{
                        ...state,
                        Games: [...state.Games.sort((a,b)=>{return a.rating - b.rating})] 
                    }
                } 
            }
            else{
                if (order === 'Upward'){
                    return{
                        ...state,
                        Games: [...state.Games.sort((a,b)=>{return a.name.localeCompare(b.name)})] 
                    }
                }
                else{
                    return{
                        ...state,
                        Games: [...state.Games.sort((a,b)=>{return b.name.localeCompare(a.name)})]
                    }
                } 
            }

        default:
            return state
    }
};
