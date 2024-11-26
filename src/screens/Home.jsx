import { Link } from "react-router-dom"

import { useGlobalContext } from "../context"
import RecipeCard from "../components/RecipeCard"

const Home = () => {
    const { recipeList } = useGlobalContext()
    const recipeCopy = [...recipeList]

    return <main>
        <h1>Recipes</h1>
        {recipeList ? <section>
                <button>
                    <Link to='/add'>
                        Add recipe
                    </Link>                    
                </button>
                {recipeCopy.map((recipe) => {
                    return <RecipeCard key={recipe.id} recipe={recipe} />
                })}             
            </section>
             : <section>
                <h2>No recipes added!</h2>
                <button>
                    <Link to='/add'>
                        Add recipe
                    </Link>                    
                </button>
            </section>}
    </main>    
}

export default Home