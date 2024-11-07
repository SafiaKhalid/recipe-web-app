import React from "react"
import { Link } from "react-router-dom"

import { useGlobalContext } from "../context"

const Home = () => {
    const { recipeList } = useGlobalContext()

    return <main>
        <h1>Recipes</h1>
        {recipeList ? <section>
                <h2>home, recipe valid</h2>                
                <button>
                    <Link to='/add'>
                        Add recipe
                    </Link>                    
                </button>
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