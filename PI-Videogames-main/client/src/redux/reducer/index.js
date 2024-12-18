import {GET_PRE_GAMES, GET_ALL_GAMES, GET_ALL_GENRES, GET_CREATED_GAMES, GET_GAME_DETAIL,
      CREATE_GAME, CREATE_GENRE, SEARCH_GAMES, ORDER_GAMES, FILTER_GAMES, DELETE_GAME, EDIT_GAME, SWITCH_LOADER, loader,
      CLEAN_CREATED} from '../actions'

const initialState = {
    Games: [],
    totalGames: 0,
    preFilter: [],
    allGames: false,
    searchedGames: [],
    createdGame: {},
    createdGames: false,
    preGames: false,
    gameDetail: [],
    deleteGame: '',
    editGame: '', 
    allGenres: [],
    createdGenre: {},
    loader: false
}

export default function superReducer(state = initialState, action){
    switch(action.type){
        case GET_ALL_GAMES:
            return{
                ...state,
                preGames: false,
                createdGames: false,
                allGames: true,
                Games: action.payload.games,
                preFilter: action.payload.games,
                totalGames: action.payload.count,
                loader: !action.payload.games.length ? false : state.loader
            };
        case GET_PRE_GAMES:
            return{
                ...state,
                allGames: false,
                createdGames: false,
                preGames: true,
                Games: action.payload.games,
                preFilter: action.payload.games,
                totalGames: action.payload.count,
                loader: !action.payload.games.length ? false : state.loader
            };
        case GET_CREATED_GAMES:
            return{
                ...state,
                allGames: false,
                preGames: false,
                createdGames: true,
                Games: action.payload.games,
                preFilter: action.payload.games,
                totalGames: action.payload.count,
                loader: !action.payload.games.length ? false : state.loader
            };
        case GET_GAME_DETAIL:
            if (!action.payload){
                return {
                    ...state,
                    gameDetail: 'Game not founded',
                    loader: false
                }
            }
            else {
                return{
                    ...state,
                    gameDetail: action.payload,
                    loader: false
                }
            };
        case SEARCH_GAMES:
            return{
                ...state,
                searchedGames: action.payload,
            };
        case CREATE_GAME:
            return{
                ...state,
                createdGame: action.payload,
                loader: false
            };
        case CREATE_GENRE:
            return{
                ...state,
                createdGenre: action.payload,
                loader: false
            };
        case GET_ALL_GENRES:
            return{
                ...state,
                allGenres: action.payload,
            };
        case ORDER_GAMES:
            let {order, orderBy} = action.payload
            if (!order){
                return{
                    ...state,
                    Games: state.preFilter,
                    loader: false
                }
            }
            else if (orderBy === 'Rating'){
                let pre = [...state.preFilter]
                if (order === 'Ascending'){
                    return{
                        ...state,
                        Games: [...state.Games.sort((a,b)=>{return a.rating - b.rating})],
                        preFilter: pre
                    }
                }
                else{
                    return{
                        ...state,
                        Games: [...state.Games.sort((a,b)=>{return b.rating - a.rating})],
                        preFilter: pre
                    }
                } 
            }
            else{
                let pre = [...state.preFilter]
                if (order === 'Ascending'){
                    return{
                        ...state,
                        Games: [...state.Games.sort((a,b)=>{return a.name.localeCompare(b.name)})],
                        preFilter: pre
                    }
                }
                else{
                    return{
                        ...state,
                        Games: [...state.Games.sort((a,b)=>{return b.name.localeCompare(a.name)})],
                        preFilter: pre
                    }
                } 
            }
        case FILTER_GAMES:
            if (action.payload == 'Any'){
                return{
                    ...state,
                    Games: state.preFilter
                }
            }
            else{
                return{
                    ...state,
                    Games: state.preFilter.filter(game => game.genre.includes(action.payload))
                }
            }
        case DELETE_GAME:
            return{
                ...state,
                deleteGame: action.payload,
                loader: false
            }
        case EDIT_GAME:
            return{
                ...state,
                editGame: action.payload,
                loader: false
            }
        case SWITCH_LOADER:
            return {
                ...state,
                loader: action.payload
            }
        case CLEAN_CREATED:
            return {
                ...state,
                createdGame: {}
            }
        default:
            return state
    }
};
