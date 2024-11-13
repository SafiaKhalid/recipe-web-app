import React, { useContext, useReducer } from "react";

import { reducer, defaultState } from "./reducer";
import { db } from "./assets/db";
import { useLiveQuery } from "dexie-react-hooks";

const AppContext = React.createContext()

const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, defaultState)
    const databaseList = useLiveQuery(() => db.recipies.toArray())

    const addRecipe = async (newRecipe) => {
        console.log('New recipe in context.jsx: ', newRecipe);
        try {                
                await db.recipies.add(newRecipe)
        } catch (error) {
            console.error(error)   
        }            
        
        console.log('Database: ', databaseList);
        
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