import Dexie from "dexie";

export const db = new Dexie('recipeDatabase')

db.version(1).stores({
    recipies: '&id, timeStamp, image, recipeName, categories, prepTime, cookTime, servings, description, ingredients, method, notes'
})            