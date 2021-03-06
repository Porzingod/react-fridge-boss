let initialState = {
  view: "recipes",
  recipes: [],
  recipe: null,
  criteria: {},
  cuisine: null,
  course: null,
  favorites: [],
  page: 0,
  searchedIngredients: [],
  searchedAllergies: [],
  searchedDiets: [],
  errors: null,
  fetching: false,
  fetched: false,
  fetchingFavorites: false,
  fetctedFavorites: false,
  posting: false,
  posted: false,
  deleting: false,
  deleted: false,
}

export const recipesReducer = (state = initialState, {type, payload}) => {
  switch(type) {
    case "FETCH_RECIPES_PENDING":
      return {...state, fetching: true, fetched: false}
    case "FETCH_RECIPES_FULFILLED":
      return {...state, fetching: false, fetched: true, recipes: payload.matches, criteria: payload.criteria}
    case "FETCH_RECIPES_REJECTED":
      return {...state, fetching: false, errors: payload}

// recipeslist did mount
    case "FETCH_FAVORITES_PENDING":
      return {...state, fetchingFavorites: true, fetchedFavorites: false}
    case "FETCH_FAVORITES_FULFILLED":
      return {...state, fetchingFavorites: false, fetchedFavorites: true, favorites: payload}
    case "FETCH_FAVORITES_REJECTED":
      return {...state, fetchingFavorites: false, errors: payload}

    case "SEARCH_RECIPES_WITH_INGREDIENTS_PENDING":
      return {...state, fetching: true, fetched: false, cuisine: payload.cuisine, course: payload.cuisine, searchedIngredients: payload.ingredients, searchedAllergies: payload.allergies, searchedDiets: payload.diets, view: "recipes", recipe: null}
    case "SEARCH_RECIPES_WITH_INGREDIENTS_FULFILLED":
      return {...state, fetching: false, fetched: true, recipes: payload.matches, criteria: payload.criteria, page: 0}
    case "SEARCH_RECIPES_WITH_INGREDIENTS_REJECTED":
      return {...state, fetching: false, errors: payload}

    case "SEARCH_MORE_RECIPES_WITH_INGREDIENTS_PENDING":
      return {...state, fetching: true, fetched: false}
    case "SEARCH_MORE_RECIPES_WITH_INGREDIENTS_FULFILLED":
      return {...state, fetching: false, fetched: true, recipes: payload.matches, criteria: payload.criteria}
    case "SEARCH_MORE_RECIPES_WITH_INGREDIENTS_REJECTED":
      return {...state, fetching: false, errors: payload}

    case "FIND_RECIPE_PENDING":
      return {...state, fetching: true, fetched: false}
    case "FIND_RECIPE_FULFILLED":
      return {...state, fetching: true, fetched: true, recipe: payload, view: "recipes"}
    case "FIND_RECIPE_REJECTED":
      return {...state, fetching: true, errors: payload}

    case "TOGGLE_BROWSE":
      return {...state, view: "recipes", recipe: null}
    case "TOGGLE_FAVORITES":
      return {...state, view: "favorites", recipe: null}
    case "DECREASE_RECIPES_PAGE":
      return {...state, page: state.page - 1}
    case "INCREASE_RECIPES_PAGE":
      return {...state, page: state.page + 1}

    case "ADD_FAVORITE":
      return {...state, favorites: [...state.favorites, payload]}
    case "REMOVE_FAVORITE":
      let favorites = state.favorites.filter( recipe => recipe.recipeId !== payload.id || recipe.id !== payload.id)
      return {...state, favorites: favorites}

    case "ADDING_FAVORITE_PENDING":
      return {...state, posting: true, posted: false, favorites: [...state.favorites, payload]}
    case "ADDING_FAVORITE_FULFILLED":
      return {...state, posting: false, posted: true}

    case "REMOVING_FAVORITE_PENDING":
      let updatedFavorites = state.favorites.filter( recipe => recipe.recipeId !== payload.id && recipe.id !== payload.id )
      return {...state, deleting: true, deleted: false, favorites: updatedFavorites}
    case "REMOVING_FAVORITE_FULFILLED":
      return {...state, deleting: false, deleted: true}
    case "REMOVING_FAVORITE_REJECTED":
      return {...state, deleting: false, errors: payload}

    case "CLEAR_RECIPES":
      return initialState

    default:
      return state
  }
}
