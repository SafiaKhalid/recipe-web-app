import { useState, useEffect } from "react"
import { Link } from "react-router-dom"

import { useGlobalContext } from "../context"
import RecipeCard from "../components/RecipeCard"
import '../stylesheets/home.css'

const Home = () => {
    const { recipeList } = useGlobalContext()
    const [sortOption, setSortOption] = useState('dateDes')
    const [recipeCopy, setRecipeCopy] = useState(recipeList)
    const [filterCheck, setFilterCheck] = useState({
        breakfast: false,
        dessert: false,
        dinner: false,
        drinks: false,
        lunch: false,
        snacks: false,
        other: false,
    })    

    const sortHandle = (e) => {        
        setSortOption(e.target.value)
    }   

    const filterHandle = (e) => {        
        const filterCat = e.target.name              
        setFilterCheck({...filterCheck, [filterCat]: !filterCheck[filterCat]})
    }

    const filterClear = () => {
        console.log('clear')
        setFilterCheck({
            breakfast: false,
            dessert: false,
            dinner: false,
            drinks: false,
            lunch: false,
            snacks: false,
            other: false,
        })    
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

    useEffect(() => {        
        const categoryList = Object.keys(filterCheck).filter(key => filterCheck[key] === true)     

        setRecipeCopy([...recipeList].filter(recipe => {
            let recipeCategories = []
            recipe.categories.forEach((category) => {
                recipeCategories.push(category.value)
            })            
            
            return categoryList.every(category => recipeCategories.includes(category))
        }))
    }, [filterCheck])
    
    return <main>
        <h1>My Recipes</h1>
        {recipeList.length > 0 ? <section id="recipe-content">
            <div id="add-sort-container">
                <button id="add-screen-button">
                    <Link to='/add'>
                        Add recipe
                    </Link>                    
                </button>                
                <div id="sort-label-container">
                    <label htmlFor="sort">Sort by</label>
                    <div id="sort-container">
                        <select name="sort" id="sort" onChange={sortHandle}>
                            <option value="dateDes">Date (newest)</option>
                            <option value="dateAsc">Date (oldest)</option>
                            <option value="aToZ">A - Z</option>
                            <option value="zToA">Z - A</option>
                            <option value="timeAsc">Time (ascending)</option>
                            <option value="timeDes">Time (descending)</option>
                        </select>
                    </div>
                </div>
            </div>
                <div id="filter-container">
                    <p>Filter</p>
                    <div id="filter-options">
                        <div className="checkbox">
                            <input type="checkbox" name="breakfast" id="breakfast" value='breakfast' checked={filterCheck.breakfast} onChange={filterHandle} />
                            <label htmlFor="breakfast">Breakfast</label>
                        </div>
                        <div className="checkbox">
                            <input type="checkbox" name="dessert" id="dessert" value='dessert' checked={filterCheck.dessert} onChange={filterHandle} />
                            <label htmlFor="dessert">Dessert</label>
                        </div>
                        <div className="checkbox">
                            <input type="checkbox" name="dinner" id="dinner" value='dinner' checked={filterCheck.dinner} onChange={filterHandle} />
                            <label htmlFor="dinner">Dinner</label>
                        </div>
                        <div className="checkbox">
                            <input type="checkbox" name="drinks" id="drinks" value='drinks' checked={filterCheck.drinks} onChange={filterHandle} />
                            <label htmlFor="drinks">Drinks</label>
                        </div>
                        <div className="checkbox">
                            <input type="checkbox" name="lunch" id="lunch" value='lunch' checked={filterCheck.lunch} onChange={filterHandle} />
                            <label htmlFor="lunch">Lunch</label>
                        </div>
                        <div className="checkbox">
                            <input type="checkbox" name="snacks" id="snacks" value='snacks' checked={filterCheck.snacks} onChange={filterHandle} />
                            <label htmlFor="snacks">Snacks</label>
                        </div>
                        <div className="checkbox">
                            <input type="checkbox" name="other" id="other" value='other' checked={filterCheck.other} onChange={filterHandle} />
                            <label htmlFor="other">Other</label>
                        </div>
                    </div>
                    <button onClick={filterClear}>Clear</button>
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