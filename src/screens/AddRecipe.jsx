import { useState } from "react"

const AddRecipe = () => {
    const [newRecipe, setNewRecipe] = useState({
        id: null,
        timeStamp: null,
        recipeName: null,
        category: null,
        preparationTime: null,
        cookTime: null,
        servings: null,
        description: null,
        ingredient: [],
        method: [],
        notes: null
    })

    const formSubmit = (e) => {
        e.preventDefault()
        console.log('submit')
    }

    return <main>
        <h1>New Recipe</h1>

        <form onSubmit={formSubmit}>
            <div>
                <label htmlFor='recipe_name'>Recipe name</label>
                <input type="text" id="recipe_name"></input>
            </div>
            <div>
                <label htmlFor='prep_time'>Preparation time</label>
                <input type="text" id="prep_time"></input>
            </div>
            <div>
                <label htmlFor='cook_time'>Cook time</label>
                <input type="text" id="cook_time"></input>
            </div>
            <div>
                <label htmlFor='servings'>Servings</label>
                <input type="text" id="servings"></input>
            </div>

            <input type="submit" value="Add recipe" />
        </form>
    </main>
}

export default AddRecipe