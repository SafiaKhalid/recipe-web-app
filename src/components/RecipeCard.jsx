import { useState, useEffect } from "react"

const RecipeCard = ({ recipe }) => {
    const { recipeName, timeStamp, image, prepTime, cookTime } = recipe
    const [displayImage, setDisplayImage] = useState(null)
    let reader = new FileReader()

    /* reader.addEventListener('load', () => {        
        setDisplayImage(reader.result)
    }, false)

    useEffect(() => {
        if (image) {            
            reader.readAsDataURL(image)                        
        }
    }, [image]) */
    /* console.log('image data: ', image); */
    console.log('local storage: ', JSON.parse(localStorage.getItem('recipeList')));
    
    

    return <section>
        <h2>{recipeName}</h2>
        <p>Updated: {timeStamp}</p>
        {/* {image ? <img src={displayImage} /> : <p>image</p>} */}        
        {prepTime && <p>Preparation time: {prepTime}</p>}
        {cookTime && <p>Cook time: {cookTime}</p>}        
    </section>
}

export default RecipeCard