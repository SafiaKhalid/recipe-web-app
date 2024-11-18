import { useGlobalContext } from "../context"

const ViewRecipe = () => {
    const { currentRecipe } = useGlobalContext()
    const focusRecipe = currentRecipe[0]
    const { recipeName, timeStamp, image, prepTime, cookTime, servings, categories, description, ingredients, method, notes } = focusRecipe
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
    
    return <main>
        <h1>View Recipe</h1>
        <p>Recipe name: {recipeName}</p>
        <p>Date added: {timeStamp}</p>
        {prepTime && <p>Preparation time: {prepObject.hours.length>0 && `${prepObject.hours}h`} {prepObject.mins.length && `${prepObject.mins}m`} </p>}
        {cookTime && <p>Cook time: {cookObject.hours.length>0 && `${cookObject.hours}h`} {cookObject.mins.length && `${cookObject.mins}m`}</p>}        
        {servings && <p>Servings: {servings}</p>}        
        {categories.length>0 && 
        <div><p>Categories:</p> {
            categories.map((category, index) => {
                return <p key={index}>{category}</p>
        })
            }</div> 
        }
        {description && <p>{description}</p>}
        {ingredients.length>0 && 
        <div><p>Ingredients:</p> {
            ingredients.map((ingredient, index) => {
                return <p key={index}>-{ingredient}</p>
            })
        }
        </div>}
    </main>
}

export default ViewRecipe