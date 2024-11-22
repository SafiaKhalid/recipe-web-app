import { db } from "./assets/db";

const databaseList = await db.recipies.toArray()
const databaseCurrent = await db.currentRecipe.toArray()


const defaultState = {
    recipeList: databaseList,
    currentRecipe: databaseCurrent
}

const reducer = (state, action) => {
    switch (action.type) {
        case 'ADD_RECIPE':                                             
            /* localStorage.setItem('recipeList', JSON.stringify(action.payload)) */
            /* console.log('local storage:', localStorage); */
            /* console.log('payload:', action.payload);      */         
            return { ...state, recipeList: [...(state.recipeList ? state.recipeList : []), action.payload] }
        case 'CHANGE_CURRENT':   
            return { ...state, currentRecipe: [action.payload] }
        case 'DELETE_RECIPE': {                       
            return { ...state, recipeList: state.recipeList.filter(recipe => recipe.id !== action.payload.id) }
        }    
        case 'EDIT_RECIPE':{
            let copyList = [...state.recipeList]
            copyList = copyList.filter(recipe => recipe.id !== action.payload.id).concat(action.payload)            
            return { ...state, recipeList: [...copyList], currentRecipe: [action.payload]}
        }
        default:
            throw new Error('no matching type')
    }
}

export { reducer, defaultState }