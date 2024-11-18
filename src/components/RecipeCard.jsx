import { useState } from "react"

const RecipeCard = ({ recipe }) => {
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
    }
     

    reader.addEventListener('load', () => {                        
        setDisplayImage(reader.result)          
    }, false)

    /* console.log('Recipe image: ', image); */
    if (image) {                        
            reader.readAsDataURL(image)                                  
    }

    return <section>
        <h2>{recipeName}</h2>
        <p>Updated: {timeStamp}</p>
        {image ? <img src={displayImage} alt={recipeName || 'recipe image'} /> : <p>{recipeName}</p>}        
        {prepTime && <p>Preparation time: {prepObject.hours.length>0 && `${prepObject.hours}h`} {prepObject.mins.length && `${prepObject.mins}m`} </p>}
        {cookTime && <p>Cook time: {cookObject.hours.length>0 && `${cookObject.hours}h`} {cookObject.mins.length && `${cookObject.mins}m`}</p>}        

    </section>
}

export default RecipeCard