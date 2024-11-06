const Ingredients = ({ fields, setFields }) => {    
    const handleChange = (index, e) => {        
        let newFields = [...fields]
        newFields[index][e.target.name] = e.target.value
        setFields(newFields)
    }

    const addIngredient = () => {        
        setFields([...fields, {ingredient: ''}])
        console.log('fields:', fields);                
    }

    const removeIngredient = (index) => {
        let newFields = [...fields]
        newFields.splice(index, 1)
        setFields(newFields)
    }

    return <fieldset>
        <legend>Ingredients</legend>
        <button type="button" onClick={() => addIngredient()}>Add ingredient</button>        
        {fields.map((e, index) => {
            return <div key={index}>
                <input type="text" name="ingredient" value={e.ingredient || ''} onChange={el => handleChange(index, el)}></input>
                <button type="button" onClick={() => removeIngredient(index)}>Remove</button>
            </div>
        })}        
    </fieldset>
}

export default Ingredients