const defaultState = {
    recipeList: JSON.parse(localStorage.getItem('recipeList'))
}

const reducer = (state, action) => {
    switch (action.type) {
        case 'ADD_RECIPE':
            // currently have to pass whole list, want to only have to pass added recipe            
            localStorage.setItem('recipeList', JSON.stringify(action.payload))
            
            return {...state, recipeList: action.payload}
        default:
            throw new Error('no matching type')
    }
}

export { reducer, defaultState }