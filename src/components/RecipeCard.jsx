import { useState } from "react"

const RecipeCard = ({ recipe }) => {
    const { recipeName, timeStamp, image, prepTime, cookTime } = recipe
    const [displayImage, setDisplayImage] = useState(null)
    let reader = new FileReader()


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
        {image ? <img src={displayImage} alt={recipeName || 'recipe image'} /> : <p>image</p>}        
        {prepTime && <p>Preparation time: {prepTime}</p>}
        {cookTime && <p>Cook time: {cookTime}</p>}        

    </section>
}

export default RecipeCard