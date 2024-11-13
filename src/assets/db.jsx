import Dexie from "dexie";

export const db = new Dexie('recipeDatabase')

db.version(1).stores({
    recipies: '&id, &timeStamp, recipeName, categories'
})