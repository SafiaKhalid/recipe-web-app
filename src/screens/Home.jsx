import React from "react"

import { useGlobalContext } from "../context"

const Home = () => {
    const { recipeList } = useGlobalContext()
    return (recipeList ? <h1>home, recipe valid</h1> : <h1>home, recipe invalid</h1>)    
}

export default Home