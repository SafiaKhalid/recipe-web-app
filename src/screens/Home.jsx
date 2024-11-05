import React from "react"

import { useGlobalContext } from "../context"

const Home = () => {
    const { recipeList } = useGlobalContext()
 
    const addRecipeButton = () => {
        console.log('add recipe');        
    }

    return <main>
        <h1>Recipes</h1>
        {recipeList ? <h2>home, recipe valid</h2> : <section>
                <h2>No recipes added!</h2>
                <button onClick={addRecipeButton}>Add recipe</button>
            </section>}
    </main>    
}

export default Home