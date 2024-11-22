import { useGlobalContext } from "../context"

const EditRecipe = () => {
    const { currentRecipe } = useGlobalContext()
    const recipeCopy = currentRecipe[0]
    return <main>
        <h1>Edit Recipe</h1>

        
    </main>
}

export default EditRecipe