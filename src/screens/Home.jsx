import { useState, useEffect } from "react"
import { Link } from "react-router-dom"

import { useGlobalContext } from "../context"
import RecipeCard from "../components/RecipeCard"

const Home = () => {
    const { recipeList } = useGlobalContext()
    const [sortOption, setSortOption] = useState('dateDes')
    const [recipeCopy, setRecipeCopy] = useState(recipeList)

    const sortHandle = (e) => {        
        setSortOption(e.target.value)
    }   

    useEffect(() => {
        switch (sortOption) {
            case 'dateDes':
                setRecipeCopy([...recipeCopy].sort((a,b) => new Date(b.timeStamp) - new Date(a.timeStamp)))          
                break
            case 'dateAsc':
                setRecipeCopy([...recipeCopy].sort((a,b) => new Date(a.timeStamp) - new Date(b.timeStamp)))                
                break
            case 'aToZ':
                setRecipeCopy([...recipeCopy].sort((a,b) => a.recipeName.localeCompare(b.recipeName)))
                break
            case 'zToA':
                setRecipeCopy([...recipeCopy].sort((a,b) => b.recipeName.localeCompare(a.recipeName)))                                     
                break
            case 'timeAsc':
                setRecipeCopy([...recipeCopy].sort((a,b) => (a.prepTime+a.cookTime).localeCompare((b.prepTime+b.cookTime))))
                break
            case 'timeDes':
                setRecipeCopy([...recipeCopy].sort((a,b) => (b.prepTime+b.cookTime).localeCompare((a.prepTime+a.cookTime))))
                break
            default:
                console.error('no matching sort option');                
        }        
    }, [sortOption])
    
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
                    <select name="sort" id="sort" onChange={sortHandle}>
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