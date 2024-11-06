import { useState } from "react"
import { v4 as uuidv4 } from "uuid"

const AddRecipe = () => {
    const [newRecipe, setNewRecipe] = useState({
        id: null,
        timeStamp: null,
        recipeName: null,
        category: null,
        prepTime: null,
        cookTime: null,
        servings: null,
        description: null,
        ingredients: [], //add
        method: [], //add
        notes: null
    })

    const formSubmit = (e) => {
        e.preventDefault()
        const date = new Date().toLocaleDateString()
        
        setNewRecipe({
            id: uuidv4(),
            timeStamp: date,
            prepTime: e.target.prep_time.value,
            cookTime: e.tarhet.cook_time.value
        })
        console.log('newRecipe:', newRecipe);
        
    }

    return <main>
        <h1>New Recipe</h1>

        <form onSubmit={formSubmit}>
            <div>
                <label htmlFor='recipe_name'>Recipe name</label>
                <input type="text" id="recipe_name" required></input>
            </div>
            <div>
                <label htmlFor='category'>Category</label>
                <input type="text" id="category" required></input>
            </div>
            <div>
                <label htmlFor='prep_time'>Preparation time</label>
                <input type="time" id="prep_time" name='prep_time' min='00:00' required></input>
            </div>
            <div>
                <label htmlFor='cook_time'>Cook time</label>
                <input type="time" id="cook_time" name="cook_time" min='00:00' required></input>
            </div>
            <div>
                <label htmlFor='servings'>Servings</label>
                <input type="text" id="servings"></input>
            </div>
            <div>
                <label htmlFor='description'>Description</label>
                <textarea id="description"></textarea>
            </div>
            <div>
                <label htmlFor='notes'>Notes</label>
                <textarea id="notes"></textarea>
            </div>

            <input type="submit" value="Add recipe" />
        </form>
    </main>
}

export default AddRecipe