const defaultState = {
    recipeList: JSON.parse(localStorage.getItem('recipeList')),
}

const reducer = (state, action) => {
    switch (action.type) {
        case 'ADD_RECIPE':                                             
            localStorage.setItem('recipeList', JSON.stringify(action.payload))
            /* console.log('payload:', action.payload); */            
            /* console.log('local storage:', localStorage); */
            return { ...state, recipeList: action.payload }
        default:
            throw new Error('no matching type')
    }
}

export { reducer, defaultState }