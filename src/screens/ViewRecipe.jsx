import { useGlobalContext } from "../context"

const ViewRecipe = () => {
    const { currentRecipe } = useGlobalContext()
    const focusRecipe = currentRecipe[0]
    
    return <main>
        <h1>View Recipe</h1>
        <p>recipe name: {focusRecipe.recipeName}</p>
    </main>
}

export default ViewRecipe