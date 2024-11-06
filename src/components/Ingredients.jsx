import { useState } from "react";

const Ingredients = () => {
    const [counter, setCounter] = useState(1)

    const addIngredient = () => {
        console.log('add ingredient');
        setCounter(counter + 1)
    }

    return <fieldset>
        <legend>Ingredients</legend>
        <button onClick={addIngredient}>Add ingredient</button>        
        {Array.from(Array(counter)).map((c, index) => {
            return <input key={index} type="text" ></input>
        })}
    </fieldset>
}

export default Ingredients