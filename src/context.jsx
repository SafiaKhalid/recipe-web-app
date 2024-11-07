import React, { useContext, useReducer } from "react";

import { reducer, defaultState } from "./reducer";

const AppContext = React.createContext()

const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, defaultState)

    const addRecipe = (newRecipe) => {
        let recipe
        if (state.recipeList) {
            recipe = [...state.recipeList, newRecipe]        
        } else {
            recipe = [newRecipe]
        }
        console.log('New recipe list', recipe);
        
        dispatch({type:'ADD_RECIPE', payload: recipe})
    }

    return <AppContext.Provider value={{...state, addRecipe}}>
        {children}
    </AppContext.Provider>
}

const useGlobalContext = () => {
    return useContext(AppContext)
}

export { AppProvider, useGlobalContext }