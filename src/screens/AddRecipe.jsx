import { useEffect, useState } from "react"
import Select from "react-select"
import { v4 as uuidv4 } from "uuid"

import MultiInput from "../components/MultiInput"
import { useGlobalContext } from "../context"
import '../stylesheets/add.css'

const AddRecipe = () => {
    const { addRecipe } = useGlobalContext()
    const [newRecipe, setNewRecipe] = useState({
        id: null,
        timeStamp: null,
        image: null,
        recipeName: null,
        categories: [],
        prepTime: null,
        cookTime: null,
        servings: null,
        description: null,
        ingredients: [],
        method: [],
        notes: null
    })
    const [selected, setSelected] = useState(null)
    const [ingredientFields, setIngredientFields] = useState([])
    const [methodFields, setMethodFields] = useState([])
    const [fileData, setFileData] = useState(null)
    const [displayImage, setDisplayImage] = useState(null)

    const categoryOptions = [
        {value: 'breakfast', label: 'Breakfast'},
        {value: 'dessert', label: 'Dessert'},
        {value: 'dinner', label: 'Dinner'},
        {value: 'drinks', label: 'Drinks'},        
        {value: 'lunch', label: 'Lunch'},
        {value: 'snacks', label: 'Snacks'},
        {value: 'other', label: 'Other'},
    ]
    const imageType = /image\/(png|jpg|jpeg)/i
    let reader = new FileReader()

    const imageHandler = (e) => {            
        const file = e.target.files[0]
        if (!file.type.match(imageType)) {
            alert('Invalid image type')
            return
        }
        setFileData(file)                         
    }

    const formSubmit = (e) => {
        e.preventDefault()
        const date = new Date().toLocaleDateString()        
        
        setNewRecipe({
            id: uuidv4(),
            timeStamp: date,
            image: (fileData || null),
            recipeName: e.target.recipe_name.value,
            categories: selected,
            prepTime: e.target.prep_time.value,
            cookTime: e.target.cook_time.value,
            servings: e.target.servings.value,
            description: e.target.description.value,
            ingredients: ingredientFields,
            method: methodFields,
            notes: e.target.notes.value,
        })

        e.target.recipe_name.value = ''
        setSelected(null)
        e.target.prep_time.value = ''
        e.target.cook_time.value = ''
        e.target.servings.value = ''
        e.target.description.value = ''
        setIngredientFields([])
        setMethodFields([])
        setDisplayImage(null)
        e.target.notes.value = ''
    }

    reader.addEventListener('load', () => {        
        setDisplayImage(reader.result)
    }, false)

    useEffect(() => {    
        if (fileData) {            
            reader.readAsDataURL(fileData)                        
        }
    }, [fileData])

    useEffect(() => {
        if (newRecipe.id) {
            addRecipe(newRecipe)
        }        
    }, [newRecipe])

    return <main>
        <h1>New Recipe</h1>

        <form onSubmit={formSubmit}>
            <div id="add-container-name">
                <label htmlFor='recipe_name'>Recipe name</label>
                <input type="text" id="recipe_name" required></input>
            </div>
            <div id="add-container-categories">
                {/*connect label to select component */}
                <label /* htmlFor='category' */>Categories</label>                
                <Select 
                    id="category" 
                    name="category" 
                    value={selected} 
                    options={categoryOptions} 
                    onChange={setSelected} 
                    closeMenuOnSelect={false}
                    className="react-select-container" 
                    classNamePrefix="react-select"
                    /* menuIsOpen={true} */
                    isMulti required />
            </div>
            <div id="add-container-prep">
                <label htmlFor='prep_time'>Preparation time</label>
                <input type="time" id="prep_time" name='prep_time' min='00:00'></input>
            </div>
            <div id="add-container-cook">
                <label htmlFor='cook_time'>Cook time</label>
                <input type="time" id="cook_time" name="cook_time" min='00:00'></input>
            </div>
            <div id="add-container-servings">
                <label htmlFor='servings'>Servings</label>
                <input type="number" id="servings"></input>
            </div>
            <div id="add-container-description">
                <label htmlFor='description'>Description</label>
                <textarea id="description" placeholder="Description" rows="7"></textarea>
            </div>
            <MultiInput fields={ingredientFields} setFields={setIngredientFields} numbered={false} />
            <MultiInput fields={methodFields} setFields={setMethodFields} numbered={true} />
            <div id="add-container-notes">
                <label htmlFor='notes'>Notes</label>
                <textarea id="notes" placeholder="Notes" rows="5"></textarea>
            </div>
            <div id="add-container-image">
                <p>Image</p>
                {displayImage ? <section>
                        <img src={displayImage} alt={newRecipe.name || 'recipe image'} />
                        <input type="file" accept="image/png, image/jpeg" onChange={imageHandler} />
                    </section> : <input type="file" accept="image/png, image/jpeg" onChange={imageHandler} />}
            </div>

            <button type="submit">Add recipe</button>
        </form>
    </main>
}

export default AddRecipe