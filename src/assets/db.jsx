import Dexie from "dexie";

export const db = new Dexie('recipeDatabase')

db.version(1).stores({
    recipies: '&id, timeStamp, recipeName, categories, prepTime, cookTime, servings, description, ingredients, method, notes'
})            

db.version(2).stores({
    recipies: '&id, timeStamp, recipeName, categories, prepTime, cookTime, servings, description, ingredients, method, notes',
    currentRecipe: '&id, timeStamp, recipeName, categories, prepTime, cookTime, servings, description, ingredients, method, notes'
})            