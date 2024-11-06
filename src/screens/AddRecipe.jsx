import { useState } from "react"
import Select from "react-select"
import { v4 as uuidv4 } from "uuid"

import MultiInput from "../components/MultiInput"

const AddRecipe = () => {
    const [newRecipe, setNewRecipe] = useState({
        id: null,
        timeStamp: null,
        image: null,
        recipeName: null,
        category: [],
        prepTime: null,
        cookTime: null,
        servings: null,
        description: null,
        ingredients: [], //add
        method: [], //add
        notes: null
    })

    const [selected, setSelected] = useState(null)
    const [ingredientFields, setIngredientFields] = useState([])
    const [methodFields, setMethodFields] = useState([])

    const categoryOptions = [
        {value: 'breakfast', label: 'Breakfast'},
        {value: 'dessert', label: 'Dessert'},
        {value: 'dinner', label: 'Dinner'},
        {value: 'drinks', label: 'Drinks'},        
        {value: 'lunch', label: 'Lunch'},
        {value: 'snacks', label: 'Snacks'},
        {value: 'other', label: 'Other'},
    ]

    const formSubmit = (e) => {
        e.preventDefault()
        const date = new Date().toLocaleDateString()        
        
        setNewRecipe({
            id: uuidv4(),
            timeStamp: date,
            recipeName: e.target.recipe_name.value,
            category: selected.map(item => item.value),
            prepTime: e.target.prep_time.value,
            cookTime: e.target.cook_time.value,
            servings: e.target.servings.value,
            description: e.target.description.value,
            ingredients: ingredientFields.map(listItem => listItem.item),
            method: methodFields.map(listItem => listItem.item),
            notes: e.target.notes.value,
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
                {/*connect label to select component */}
                <label /* htmlFor='category' */>Category</label>                
                <Select id="category" name="category" defaultValue={selected} options={categoryOptions} onChange={setSelected} isMulti required />
            </div>
            <div>
                <label htmlFor='prep_time'>Preparation time</label>
                <input type="time" id="prep_time" name='prep_time' min='00:00'></input>
            </div>
            <div>
                <label htmlFor='cook_time'>Cook time</label>
                <input type="time" id="cook_time" name="cook_time" min='00:00'></input>
            </div>
            <div>
                <label htmlFor='servings'>Servings</label>
                <input type="number" id="servings"></input>
            </div>
            <div>
                <label htmlFor='description'>Description</label>
                <textarea id="description"></textarea>
            </div>
            <MultiInput fields={ingredientFields} setFields={setIngredientFields} numbered={false} />
            <MultiInput fields={methodFields} setFields={setMethodFields} numbered={true} />
            <div>
                <label htmlFor='notes'>Notes</label>
                <textarea id="notes"></textarea>
            </div>

            <button type="submit">Add recipe</button>
        </form>
    </main>
}

export default AddRecipe