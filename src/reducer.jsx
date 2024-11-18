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
        /* case 'CHANGE_CURRENT': */

        default:
            throw new Error('no matching type')
    }
}

export { reducer, defaultState }