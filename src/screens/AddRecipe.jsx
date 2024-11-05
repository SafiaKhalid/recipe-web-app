const AddRecipe = () => {
    return <main>
        <h1>New Recipe</h1>

        <form>
            <div>
                <label>Recipe name</label>
                <input type="text" id="recipe_name"></input>
            </div>
            <div>
                <label>Preparation time</label>
                <input type="text" id="recipe_name"></input>
            </div>
            <div>
                <label>Cook time</label>
                <input type="text" id="recipe_name"></input>
            </div>
            <div>
                <label>Servings</label>
                <input type="text" id="recipe_name"></input>
            </div>

            <input type="submit" value="Add recipe" />
        </form>
    </main>
}

export default AddRecipe