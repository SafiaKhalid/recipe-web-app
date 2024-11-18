import React, { useContext, useReducer } from "react";

import { reducer, defaultState } from "./reducer";
import { db } from "./assets/db";
/* import { useLiveQuery } from "dexie-react-hooks"; */

const AppContext = React.createContext()

const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, defaultState)
    /* const databaseList = useLiveQuery(() => db.recipies.toArray()) */

    //clear table
    /* useEffect(() => {
        db.recipies.clear()
    }, []) */

    const addRecipe = async (newRecipe) => {
        /* console.log('New recipe in context.jsx: ', newRecipe); */
        try {                
            await db.recipies.add(newRecipe)
        } catch (error) {
            console.error(error)   
        }            
        
        /* console.log('Database: ', databaseList); */
        
        dispatch({ type:'ADD_RECIPE', payload: newRecipe })
    }

    const changeCurrentRecipe = async (currentRecipe) => {
        try {
            await db.currentRecipe.clear()
            await db.currentRecipe.add(currentRecipe)
        } catch (error) {
            console.error(error);   
        }

        dispatch({ type:'CHANGE_CURRENT', payload: currentRecipe })
    }

    const deleteRecipe = async (recipe) => {        
        try {
            await db.recipies.delete(recipe.id)
        } catch (error) {
            console.error(error);            
        }

        dispatch({ type:'DELETE_RECIPE', payload: recipe })
    }

    return <AppContext.Provider value={{...state, addRecipe, changeCurrentRecipe, deleteRecipe}}>
        {children}
    </AppContext.Provider>
}

const useGlobalContext = () => {
    return useContext(AppContext)
}

export { AppProvider, useGlobalContext }