const express = require("express")
const { getRecipes,getRecipe,addRecipe,editRecipe,upload,deleteRecipe} = require("../controller/recipe")
const verifyToken = require("../middleware/auth")
const router = express.Router()

router.get("/", getRecipes) //get all recipes
router.get("/:id",getRecipe) //get recipe by id
router.post("/",upload.single('file'),verifyToken, addRecipe) //add recipe
router.put("/:id",editRecipe) //edit
router.delete("/:id",deleteRecipe) //delete
module.exports = router