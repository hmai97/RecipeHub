//table schema
const mongoose = require("mongoose")

const recipeSchema = mongoose.Schema({
    title:{
        type:String,
        required:true//this field is nessessary to fill

    },
    ingredients:{
        type:Array,
        required:true//this field is nessessary to fill

    },
    instructions:{
        type:String,
        required:true//this field is nessessary to fill

    },
    time:{
        type:String
       //this field is nessessary to fill
    },
    image:{
        type:String
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }

},{timestamps:true})//get update and create time

module.exports = mongoose.model("Recipes", recipeSchema)