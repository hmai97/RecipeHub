const Recipes = require("../models/recipe")
const multer = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/images')
    },
    filename: function (req, file, cb) {
        const filename = Date.now() + '-' + file.fieldname
        cb(null, filename)
    }
  })
  
  const upload = multer({ storage: storage })

const getRecipes= async (req,res)=>{ //get all recipes
   const recipes = await Recipes.find() 
   return  res.json(recipes)
}

const getRecipe= async (req,res)=>{
    const recipe = await Recipes.findById(req.params.id)
    return res.json(recipe)
}

const addRecipe= async (req,res)=>{
    console.log(req.user)
    const {title,ingredients, instructions,time} =req.body
    if(!title || !ingredients || !instructions)
    {
        res.json({message:"Required"})
    }

    const newRecipe = await Recipes.create(
        {title,ingredients,instructions,time,image:req.file.filename, createdBy:req.user.id
        }

    )
    return res.json(newRecipe)
}

const editRecipe = async (req,res)=>{
        try {
            const recipe = await Recipes.findById(req.params.id);
            if (!recipe) return res.status(404).json({ message: "Recipe not found" });
    
            const updates = (({ title, ingredients, instructions, time }) => ({ title, ingredients, instructions, time }))(req.body);
    
            recipe.set(updates);
    
            const updatedRecipe = await recipe.save();
            res.json(updatedRecipe);
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: "Something went wrong" });
        }
};
    


const deleteRecipe= async (req,res)=>{
    try {
        const deleted = await Recipes.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ message: "Recipe not found" });
    
        res.json({ message: "Recipe deleted successfully" });
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Something went wrong" });
      }
}

module.exports = {getRecipes,getRecipe,addRecipe,editRecipe,deleteRecipe,upload}