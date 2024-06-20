const UsersModel = require("../models/user-model")
const Joi = require("joi")
const _ = require("lodash")
const bcrypt = require("bcrypt")
 
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
    // اگر میخوای فقط اسم و ایمیل رو برگدونه نه پسورد رو = lodash
    res.send(_.pick(newUser, ["id", "name", "email"]))
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
    
res.send("login")
};

module.exports= {register, login}