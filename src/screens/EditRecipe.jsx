import { useState, useEffect } from "react"
import Select from "react-select"
import { Link } from "react-router-dom"
import { useGlobalContext } from "../context"
import MultiInput from "../components/MultiInput"
import '../stylesheets/edit.css'

const EditRecipe = () => {
    const { currentRecipe, editRecipe } = useGlobalContext()
    const recipeCopy = currentRecipe[0]

    const [selected, setSelected] = useState(recipeCopy.categories)
    const [methodFields, setMethodFields] = useState(recipeCopy.method)
    const [fileData, setFileData] = useState(recipeCopy.image)
    const [displayImage, setDisplayImage] = useState(null)
    const [ingredientFields, setIngredientFields] = useState(recipeCopy.ingredients)
    const [newRecipe, setNewRecipe] = useState(recipeCopy)
    
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

    reader.addEventListener('load', () => {                        
        setDisplayImage(reader.result)          
    }, false)
    
    if (fileData) {                        
        reader.readAsDataURL(fileData)                                  
    }

    const formSubmit = (e) => {            
        e.preventDefault()                
        editRecipe(newRecipe)
    }
    
    useEffect(() => {
        setNewRecipe({...newRecipe, categories: selected, ingredients: ingredientFields, method: methodFields, image: (fileData || null),})        
    }, [selected, ingredientFields, methodFields, fileData])

    return <main>
        <h1>Edit Recipe</h1>

        <form onSubmit={formSubmit}>
            <div>
                <label htmlFor='recipe_name'>Recipe name</label>
                <input type="text" id="recipe_name" value={newRecipe.recipeName} onChange={e => setNewRecipe({...newRecipe, recipeName:e.target.value})} required></input>
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
                    isMulti required 
                />
            </div>
            <div>
                <label htmlFor='prep_time'>Preparation time</label>
                {newRecipe.prepTime ? 
                    <input type="time" id="prep_time" name='prep_time' min='00:00' value={newRecipe.prepTime} onChange={e => setNewRecipe({...newRecipe, prepTime:e.target.value})} ></input> :
                    <input type="time" id="prep_time" name='prep_time' min='00:00' defaultValue={newRecipe.prepTime} onChange={e => setNewRecipe({...newRecipe, prepTime:e.target.value})} ></input>
                }                
            </div>
            <div>
                <label htmlFor='cook_time'>Cook time</label>
                {newRecipe.cookTime ? 
                    <input type="time" id="cook_time" name='cook_time' min='00:00' value={newRecipe.cookTime} onChange={e => setNewRecipe({...newRecipe, cookTime:e.target.value})} ></input> :
                    <input type="time" id="cook_time" name='cook_time' min='00:00' defaultValue={newRecipe.cookTime} onChange={e => setNewRecipe({...newRecipe, cookTime:e.target.value})} ></input>
                }
            </div>
            <div>
                <label htmlFor='servings'>Servings</label>
                <input type="number" id="servings" value={newRecipe.servings} onChange={e => setNewRecipe({...newRecipe, servings:e.target.value})}></input>
            </div>
            <div id="add-container-description">
                <label htmlFor='description'>Description</label>
                <textarea id="description" value={newRecipe.description} onChange={e => setNewRecipe({...newRecipe, description:e.target.value})}></textarea>
            </div>
            
            <MultiInput fields={ingredientFields} setFields={setIngredientFields} numbered={false} />
            <MultiInput fields={methodFields} setFields={setMethodFields} numbered={true} />
            <div id="add-container-notes">
                <label htmlFor='notes'>Notes</label>
                <textarea id="notes" value={newRecipe.notes} onChange={e => setNewRecipe({...newRecipe, notes:e.target.value})}></textarea>
            </div>
            <div id="add-container-image">
                <p>Image</p>
                {displayImage ? <section>                        
                        <input type="file" accept="image/png, image/jpeg" onChange={imageHandler} />
                        <img src={displayImage} alt={newRecipe.name || 'recipe image'} />
                    </section> : <input type="file" accept="image/png, image/jpeg" onChange={imageHandler} />}
            </div>

            <button type="submit">
                <Link to='/'>
                    Edit recipe
                </Link>                
            </button>
        </form>
    </main>
}

export default EditRecipe