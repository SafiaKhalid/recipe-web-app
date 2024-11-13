import React, { useContext, useReducer } from "react";

import { reducer, defaultState } from "./reducer";
import { db } from "./assets/db";

const AppContext = React.createContext()

const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, defaultState)

    const addRecipe = async (newRecipe) => {
        /* let recipe
        if (state.recipeList) {
            recipe = [...state.recipeList, newRecipe]        
        } else {
            recipe = [newRecipe]
        }
         */
        console.log('New recipe in context.jsx: ', newRecipe);
        try {                
                await db.recipies.add(newRecipe)
            } catch (error) {
                console.error(error)   
            }
        
        dispatch({type:'ADD_RECIPE', payload: newRecipe})
    }

    return <AppContext.Provider value={{...state, addRecipe}}>
        {children}
    </AppContext.Provider>
}

const useGlobalContext = () => {
    return useContext(AppContext)
}

export { AppProvider, useGlobalContext }