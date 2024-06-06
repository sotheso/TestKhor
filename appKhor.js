// برای اینپورت کردن یه پکیج یا اضافه کردن یه ماژول به برنامه
// const uuid = require('uuid')
// console.log(uuid.v4())

// تغییر ورژن برنامه 
// npm version patch (x.x.A) فقط باگ هارو رفع کردی
// npm version minor (x.A.x) فیچرهایی اضافه کردی و ای پی ای تغییر نکردن
// npm version major (A.x.x) فیچرهایی اضافه کردی و ای پی ای تغییر کردن

// یرای دانلود پکیح هایی که بعدا برای پابلیش کردن اپ بهشون نیاز نداریم
// npm i اسم پکیج --save-dev

// حذف کردن پکیج
// npm un اسم پکیج

// دانلود نسخه دیگری از پکیج
// npm i اسم پکیج@شماره نسخه
// مثال: npm i jshint@2.10.1

// فهمیدن اینکه کدم پکیج‌ها ورژنشون قدیمیه میشه اپ‌دیت کرد
// npm outdated

// ادپدیت کردن ورژن پکیج (تمام پکیج ها یکجا)
// npm update

const express = require("express")

// To access the environment variable
require('dotenv').config()

const app = express()

// for get body POST
app.use(express.json())

// Data Base
const Papers=[
    {id : 1, name : 'Gole'},
    {id : 2, name : 'Etelaate'},
    {id : 3, name : 'Abrar'},
    {id : 4, name : 'Iran'},
]

//----------------------------------------
// GET method

// For Home Page
app.get("/", (reqm, res)=>{
    res.send("Hello Sothesom")
})

// For Papers
app.get('/api/papers', (req, res)=> {
    res.send(['Gol','KhabareVarzeshi', 'Sharq', 'Iran'])
})

// Access to any newspaper
// app.get('/api/papers/:id', (req, res)=>{
//     res.send(req.params.id)
// })

// Access to two newspapers
// app.get('/api/papers/:id/:id2?', (req, res)=>{
//     res.send([req.params.id, req.params.id2])
// })

// /api/papers/3/4?sort=id
app.get('/api/papers/:id/:id2', (req, res)=>{
    res.send([req.params.id, req.params.id2, req.query.sort])
})

app.get('/api/papers/:id', (req, res)=> {
    const paper = Papers.find(c => c.id === Number(req.params.id))
    if (!paper) res.status(404).send("روزنامه یافت نشد")
    res.send(paper)
})

//----------------------------------------
// POST method

app.post('/api/papers', (req, res)=>{

// test deta is true?
    if(!req.body.name || req.body.name.length < 3){
        res.status(400).send("اسم روزنامه مناسب نیست")
        return
    }

    const NewPaper ={
        id: Papers.length +1, 
        name : req.body.name
    }

    Papers.push(NewPaper)
    res.send(NewPaper)
})

//----------------------------------------
// PUT method

app.put('/api/papers/:id', (req, res)=>{
// check papers
    const paper = Papers.find(c => c.id === Number(req.params.id))
    if (!paper) return res.status(404).send("روزنامه یافت نشد")

// test deta is true?
    if(!req.body.name || req.body.name.length < 3){
    res.status(400).send("اسم روزنامه مناسب نیست")
    return
    }

    paper.name = req.body.name
    res.send(paper) 
})

//----------------------------------------
// DELETE mathod

app.delete('/api/papers/:id', (req, res)=>{
// check papers
    const paper = Papers.find(c => c.id === Number(req.params.id))
    if (!paper) return res.status(404).send("روزنامه یافت نشد")

    const index = Papers.indexOf(paper)
    Papers.splice(index, 1)

    res.send(paper)
})

// Environment variable (PORT) => .env file
const port = process.env.PORT || 3000
app.listen(port, () =>{
    console.log(`be porte ${port} vasle`)
})