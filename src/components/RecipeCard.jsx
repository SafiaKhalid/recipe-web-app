import { useState } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUtensils } from '@fortawesome/free-solid-svg-icons'

import { useGlobalContext } from "../context"

const RecipeCard = ({ recipe, setViewRecipe }) => {
    const { changeCurrentRecipe } = useGlobalContext()
    const { recipeName, timeStamp, image, prepTime, cookTime } = recipe
    const [displayImage, setDisplayImage] = useState(null)
    let reader = new FileReader()
    const prepObject = {hours: '', mins: ''}
    const cookObject = {hours: '', mins: ''}
    
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

    /* console.log('Recipe image: ', image); */
    if (image) {                        
            reader.readAsDataURL(image)                                  
    }

    const cardHandler = (e) => {  
        e.preventDefault()
        /* e.target.focus({ 
            preventScroll: true,
            shouldFocusAfterRender:false
         })
        e.stopPropagation() */
        changeCurrentRecipe(recipe)
        setViewRecipe(true)           
    }

    return <button id="recipe-card" onClick={e => cardHandler(e)}>        
            {image ? <img src={displayImage} alt={recipeName || 'recipe image'} /> : <div id="card-alt-container"><FontAwesomeIcon icon={faUtensils} id="card-alt" /></div>}
            <div id="card-content">
                <h2>{recipeName}</h2>
                <p>Added: {timeStamp}</p>                    
                {prepTime && <p>Preparation time: {prepObject.hours.length>0 && `${prepObject.hours}h`} {prepObject.mins.length>0 && `${prepObject.mins}m`} </p>}
                {cookTime && <p>Cook time: {cookObject.hours.length>0 && `${cookObject.hours}h`} {cookObject.mins.length>0 && `${cookObject.mins}m`}</p>}        
            </div>        
    </button>
}

export default RecipeCard