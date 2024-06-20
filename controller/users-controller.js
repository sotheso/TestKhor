const UsersModel = require("../models/user-model")
const Joi = require("joi")
const _ = require("lodash")
const bcrypt = require("bcrypt")
// Token
const jwt = require("jsonwebtoken")
// env inport fot secret token key
require("dotenv").config()
 
const register = async(req, res, next) => {
    // test ture data inport => best work : use pakage joi
    const schema = {
        // پیام خطای سفارشی
        name : Joi.string().min(3).max(50).required().messages({
            "string.min" : "تعداد کراکتر کم است"
        }),
        email : Joi.string().email().required(),
        password : Joi.string().min(5).max(50).required()
    }

    const validateResult = Joi.object(schema).validate(req.body)
    if (validateResult.error)
        return res.send(validateResult.error.details[0].message)

    const user = await UsersModel.getUserByEmail(req.body.email)
    if (user) return res.status(400).send("این ایمیل قبلا ثبت شده")

// هش کردن پسورد با = bcrypt
    const hashPassword = await bcrypt.hash(req.body.password, 10)
    
    const result = await UsersModel.insertUser(
        req.body.name, req.body.email, hashPassword
    )
    console.log(result)

    const newUser = await UsersModel.getUserByEmail(req.body.email)

    const token = jwt.sign({id: newUser.id}, process.env.SECRET_KEY_TOKEN)

    // اگر میخوای فقط اسم و ایمیل رو برگدونه نه پسورد رو = lodash
    res.header('Authorization', token).send(_.pick(newUser, ["id", "name", "email"]))
};

const login = async(req, res, next) => {
    // test ture data inport => best work : use pakage joi
    const schema = {
        email : Joi.string().email().required(),
        password : Joi.string().min(5).max(50).required()
    }

    const validateResult = Joi.object(schema).validate(req.body)
    if (validateResult.error)
        return res.send(validateResult.error.details[0].message)

    const user = await UsersModel.getUserByEmail(req.body.email)
    if(!user) return res.status(400).send("email or password invalid")
    
    // test password is ture or not
    const validpassword = await bcrypt.compare(req.body.password, user.password)
    if (!validpassword) return res.status(400).send("email or password is invalid")
    
    const token = jwt.sign({id: user.id}, process.env.SECRET_KEY_TOKEN)
    res.send(token)
};

module.exports= {register, login}