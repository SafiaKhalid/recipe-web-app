import { useEffect } from "react"

const MultiInput = ({ fields, setFields, numbered }) => {    
    const handleChange = (index, e) => {        
        let newFields = [...fields]
        newFields[index][e.target.name] = e.target.value        
        setFields(newFields)                            
    }

    useEffect(() => {
        console.log('fields:', fields);        
    }, [fields])

    const addField = () => {        
        setFields([...fields, {item: ''}])                   
    }

    const removeField = (index) => {
        let newFields = [...fields]
        newFields.splice(index, 1)
        setFields(newFields)
    }

    return <fieldset>
        {numbered ? <legend>Method</legend> : <legend>Ingredients</legend>}        
        {fields.map((e, index) => {
            return <div key={index}>
                { numbered && <p>{index+1}</p> }
                <input type="text" name="item" value={e.item || ''} onChange={el => handleChange(index, el)}></input>
                <button type="button" onClick={() => removeField(index)}>Remove</button>
            </div>
        })}        
        <button type="button" onClick={() => addField()}>{numbered ? <p>Add step</p> : <p>Add ingredient</p>}</button>        
    </fieldset>
}

export default MultiInput