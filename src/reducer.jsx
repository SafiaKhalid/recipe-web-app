
import { db } from "./assets/db";

const databaseList = await db.recipies.toArray()


const defaultState = {
    recipeList: databaseList,
}

const reducer = (state, action) => {
    switch (action.type) {
        case 'ADD_RECIPE':                                             
            /* localStorage.setItem('recipeList', JSON.stringify(action.payload)) */

                      
            /* console.log('local storage:', localStorage); */
            /* console.log('payload:', action.payload);      */         
            return { ...state, recipeList: [...(state.recipeList ? state.recipeList : []), action.payload] }
        default:
            throw new Error('no matching type')
    }
}

export { reducer, defaultState }