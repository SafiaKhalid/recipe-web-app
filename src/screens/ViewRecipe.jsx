import { useState } from "react"
import { useGlobalContext } from "../context"
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faX } from '@fortawesome/free-solid-svg-icons'

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
    
    return <div id="view-container">
        {modalDisplay && <div>
            Are you sure you want to delete this recipe?            
            <button onClick={deleteHandler}>Yes</button>            
            <button onClick={() => setModalDisplay(!modalDisplay)}>Go back</button>
        </div>}
        <div id="view-title">            
            <div id="view-title-text">                
                <h1>{recipeName}</h1>
                <p>Date added: {timeStamp}</p>
            </div>
            <button onClick={() => setViewRecipe(false)} id="view-close-btn">
                <FontAwesomeIcon icon={faX} />
            </button>        
        </div>
        {image ? <img src={displayImage} alt={recipeName || 'recipe image'} id="view-img" /> : <p>{recipeName}</p>}
        <div id="prep-cook-container">
            {Object.values(prepObject).filter(e => e !== '').length > 0 && <p>Preparation time: {prepObject.hours.length>0 && `${prepObject.hours}h`} {prepObject.mins.length>0 && `${prepObject.mins}m`} </p>}
            {Object.values(cookObject).filter(e => e !== '').length > 0 && <p>Cook time: {cookObject.hours.length>0 && `${cookObject.hours}h`} {cookObject.mins.length>0 && `${cookObject.mins}m`}</p>}        
        </div>        
        {servings && <p id="view-servings">Servings: {servings}</p>}
        {categories.length>0 && 
            <div id="category-container">
                <p id="category-title">Categories</p>
                <div id="category-list">
                    {categories.map((category, index) => {
                        return <p key={index}>{category.value}</p>
                    })
                    }
                </div>
            </div> 
        }
        {description && <p id="view-description">{description}</p>}
        {ingredients.length>0 && 
        <div id="view-ingredients">
            <p id="view-ingredients-title">Ingredients:</p> {
            ingredients.map((ingredient, index) => {
                return <p key={index}>- {ingredient.item}</p>
            })
        }
        </div>}
        {method.length>0 && 
        <div id="view-method">
            <p id="view-method-title">Method:</p> {
            method.map((step, index) => {
                return <p key={index}>{index+1}) {step.item}</p>
            })
        }
        </div>}
        {notes && <p id="view-notes">Notes: {notes}</p>}
        <div id="edit-delete-container">
            <button>
                <Link to='/edit'>
                    Edit
                </Link>
            </button>
            <button onClick={() => setModalDisplay(!modalDisplay)}>
                Delete
            </button>
        </div>
    </div>
}

export default ViewRecipe