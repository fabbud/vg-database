import AllGamesActionTypes from './all-games.types';

const INITIAL_STATE = {
  allGamesCollection: [],
  genreGamesCollection: [],
  loading: false,
  error: null
}

const allGamesReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AllGamesActionTypes.FETCH_ALLGAMES_START:
    case AllGamesActionTypes.FETCH_GENRE_GAMES_START:
      return {
        ...state,
        loading: true
      }
    case AllGamesActionTypes.FETCH_ALLGAMES_SUCCESS:
      return {
        ...state,
        allGamesCollection: action.payload,
        loading: false,
        error: null
      }
    case AllGamesActionTypes.FETCH_GENRE_GAMES_SUCCESS:
      return {
        ...state,
        genreGamesCollection: action.payload,
        loading: false,
        error: null
      }
    case AllGamesActionTypes.FETCH_ALLGAMES_FAILURE:
    case AllGamesActionTypes.FETCH_GENRE_GAMES_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
        allGamesCollection: [],
        genreGamesCollection: []
      }
    default:
      return state;
  }
}

export default allGamesReducer;