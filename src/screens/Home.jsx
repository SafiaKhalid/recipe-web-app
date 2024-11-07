import { Link } from "react-router-dom"

import { useGlobalContext } from "../context"
import RecipeCard from "../components/RecipeCard"

const Home = () => {
    const { recipeList } = useGlobalContext()

    return <main>
        <h1>Recipes</h1>
        {recipeList ? <section>
                <button>
                    <Link to='/add'>
                        Add recipe
                    </Link>                    
                </button>
                <h2>home, recipe valid</h2>   
                {recipeList.map((recipe) => {
                    return <RecipeCard key={recipe.id} />
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