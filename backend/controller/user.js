const Users = require("../models/user")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const userSignUp = async (req,res) =>{
    const {name,email,password} = req.body
    if(!name| !email || !password)
    {
        return res.status(400).json({message: "Name, email and password is required"})
    }
    let user = await Users.findOne({email})
    if(user)
    {
        return res.status(400).json({error: "Email is already used"})
    }
    const hashPW = await bcrypt.hash(password,10)
    const newUser = await Users.create(
        {name,email, password:hashPW}
    )
    let token = jwt.sign({email,id:newUser._id},process.env.SECRET_KEY)
    return res.status(200).json({token,user:newUser})
}

const userLogin = async (req,res) =>{
    const {email,password} = req.body
    if(!email || !password)
    {
        return res.status(400).json({message: "Email and password is required"})
    }
    let user = await Users.findOne({email})
    if (user && await bcrypt.compare(password,user.password))
    {
        let token = jwt.sign({email,id:user._id},process.env.SECRET_KEY)
        return res.status(200).json({token,user})
    }
    else
    {
        return res.status(400).json({error: "Invalid"})
    }
}

const getUser = async (req,res) =>{
    const user = await Users.findById(req.params.id)
    res.json({name:user.name,email:user.email})
}

module.exports = {userSignUp,userLogin,getUser}