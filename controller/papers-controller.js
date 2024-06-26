const { result, constant } = require('underscore');
const PapersModel = require('../models/papes-model');
const errorHandler = require('../middelwares/error_handler');
const {trycatchHandler} = require('../utilities/trycatch_handler');


const getPaper = trycatchHandler(async (req, res)=> {
    const result = await PapersModel.getPaper(parseInt(req.params.id))
    if (!result) res.status(404).send("روزنامه یافت نشد")
        res.send(result)
});

const getPapers = trycatchHandler(async(req, res)=> {
    const result = await PapersModel.getPapers()
    res.send(result)
})

const getPaperSort = (req, res)=>{
    res.send([req.params.id, req.params.id2, req.query.sort])
}

const postPaper = (req, res)=>{
// test deta is true?
     if(!req.body.name || req.body.name.length < 3){
        res.status(400).send("اسم روزنامه مناسب نیست")
        return
    }
    PapersModel.insertPapers(req.body.name).then((result)=>{
        res.send(result)
    })
}

const putPaper = (req, res)=>{
    PapersModel.getPaper(parseInt(req.params.id)).then((result)=>{
    if (!result) return res.status(404).send("روزنامه یافت نشد")
    })
// check papers
    //const paper = Papers.find(c => c.id === Number(req.params.id))
    // if (!paper) return res.status(404).send("روزنامه یافت نشد")

// test deta is true?
    if(!req.body.name || req.body.name.length < 3){
    res.status(400).send("اسم روزنامه مناسب نیست")
    return
    }

    PapersModel.updatePaper(parseInt(req.params.id), req.body.name).then((result)=>{
        res.send(result) 
    })
}

const deletePaper = ('/:id', (req, res)=>{
// check papers
    PapersModel.getPaper(parseInt(req.params.id)).then((result)=>{
    if (!result) return res.status(404).send("روزنامه یافت نشد")
    })
    PapersModel.deletePaper(parseInt(req.params.id)).then((result)=>{
        res.send(result)
    })
})

module.exports = {
    getPaper,
    getPapers,
    getPaperSort,
    postPaper,
    putPaper,
    deletePaper
}