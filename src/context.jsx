import React, { useContext, useReducer, useEffect } from "react";

import { reducer, defaultState } from "./reducer";

const AppContext = React.createContext()

const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, defaultState)

    useEffect(() => {
        console.log('Default state: ', defaultState)
    }, [])

    const addRecipe = (recipe) => {
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