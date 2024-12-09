import { useState } from "react"
import { useGlobalContext } from "../context"
import { Link } from "react-router-dom"

const ViewRecipe = ({ setViewRecipe }) => {
    const { currentRecipe, deleteRecipe } = useGlobalContext()
    const focusRecipe = currentRecipe[0]
    const { recipeName, timeStamp, image, prepTime, cookTime, servings, categories, description, ingredients, method, notes } = focusRecipe    
    let reader = new FileReader()
    let prepObject = {hours: '', mins: ''}
    let cookObject = {hours: '', mins: ''}

    const [displayImage, setDisplayImage] = useState(null)
    const [modalDisplay, setModalDisplay] = useState(false)    

    if (prepTime) {
        prepObject['hours'] = prepTime.slice(0,2)
        prepObject['mins'] = prepTime.slice(3)
        if (prepObject.hours[0] == '0') {
            prepObject['hours'] = prepObject.hours[1]
        }
        if ((prepObject.hours) == '0') {
            prepObject['hours'] = ''
        }        
        if (prepObject.mins[0] == '0') {
            prepObject['mins'] = prepObject.mins[1]
        }
        if ((prepObject.mins) == '0') {
            prepObject['mins'] = ''
        }                
    }

    if (cookTime) {
        cookObject['hours'] = cookTime.slice(0,2)
        cookObject['mins'] = cookTime.slice(3)
        if (cookObject.hours[0] == '0') {
            cookObject['hours'] = cookObject.hours[1]
        }
        if ((cookObject.hours) == '0') {
            cookObject['hours'] = ''
        }        
        if (cookObject.mins[0] == '0') {
            cookObject['mins'] = cookObject.mins[1]
        }
        if ((cookObject.mins) == '0') {
            cookObject['mins'] = ''
        }        
    }

    reader.addEventListener('load', () => {                        
        setDisplayImage(reader.result)          
    }, false)
    
    if (image) {                        
        reader.readAsDataURL(image)                                  
    }

    const deleteHandler = () => {
        deleteRecipe(focusRecipe)
        setViewRecipe(false)
    }
    
    return <main>
        {modalDisplay && <div>
            Are you sure you want to delete this recipe?            
            <button onClick={deleteHandler}>Yes</button>            
            <button onClick={() => setModalDisplay(!modalDisplay)}>Go back</button>
        </div>}
        
        <h1>View Recipe</h1>
        <p>Recipe name: {recipeName}</p>
        <p>Date added: {timeStamp}</p>
        {image ? <img src={displayImage} alt={recipeName || 'recipe image'} /> : <p>{recipeName}</p>}        
        {Object.values(prepObject).filter(e => e !== '').length > 0 && <p>Preparation time: {prepObject.hours.length>0 && `${prepObject.hours}h`} {prepObject.mins.length>0 && `${prepObject.mins}m`} </p>}
        {Object.values(cookObject).filter(e => e !== '').length > 0 && <p>Cook time: {cookObject.hours.length>0 && `${cookObject.hours}h`} {cookObject.mins.length>0 && `${cookObject.mins}m`}</p>}        
        {servings && <p>Servings: {servings}</p>}        
        {categories.length>0 && 
        <div><p>Categories:</p> {
            categories.map((category, index) => {
                return <p key={index}>{category.value}</p>
        })
            }</div> 
        }
        {description && <p>{description}</p>}
        {ingredients.length>0 && 
        <div><p>Ingredients:</p> {
            ingredients.map((ingredient, index) => {
                return <p key={index}>-{ingredient.item}</p>
            })
        }
        </div>}
        {method.length>0 && 
        <div><p>Method:</p> {
            method.map((step, index) => {
                return <p key={index}>{index+1}) {step.item}</p>
            })
        }
        </div>}
        {notes && <p>Notes: {notes}</p>}
        <button>
            <Link to='/edit'>
                Edit
            </Link>
        </button>
        <button onClick={() => setModalDisplay(!modalDisplay)}>
            Delete
        </button>
    </main>
}

export default ViewRecipe