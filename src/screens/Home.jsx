import { Link } from "react-router-dom"

import { useGlobalContext } from "../context"
import RecipeCard from "../components/RecipeCard"

const Home = () => {
    const { recipeList } = useGlobalContext()
    const recipeCopy = [...recipeList]


    //find way to order recipeCopy based on user dropdown options for order
    return <main>
        <h1>Recipes</h1>
        {recipeCopy.length > 0 ? <section>
                <button>
                    <Link to='/add'>
                        Add recipe
                    </Link>                    
                </button>
                <div>
                    <label htmlFor="sort">Sort</label>
                    <select name="sort" id="sort">
                        <option value="dateDes">Date (newest)</option>
                        <option value="dateAsc">Date (oldest)</option>
                        <option value="aToZ">A - Z</option>
                        <option value="zToA">Z - A</option>
                        <option value="timeAsc">Time (ascending)</option>
                        <option value="timeDes">Time (descending)</option>
                    </select>
                </div>
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