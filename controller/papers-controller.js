// Data Base
const Papers=[
    {id : 1, name : 'Gole'},
    {id : 2, name : 'Etelaate'},
    {id : 3, name : 'Abrar'},
    {id : 4, name : 'Iran'},
];


const getPaper = (req, res)=> {
    const paper = Papers.find(c => c.id === Number(req.params.id))
    if (!paper) res.status(404).send("روزنامه یافت نشد")
    res.send(paper)
};

const getPapers =  (req, res)=> {
    res.send(['Gol','KhabareVarzeshi', 'Sharq', 'Iran'])
}

const getPaperSort = (req, res)=>{
    res.send([req.params.id, req.params.id2, req.query.sort])
}

const postPaper = (req, res)=>{
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
}

const putPaper = (req, res)=>{
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
}

const deletePaper = ('/:id', (req, res)=>{
// check papers
    const paper = Papers.find(c => c.id === Number(req.params.id))
    if (!paper) return res.status(404).send("روزنامه یافت نشد")

    const index = Papers.indexOf(paper)
    Papers.splice(index, 1)

    res.send(paper)
})

module.exports = {
    getPaper,
    getPapers,
    getPaperSort,
    postPaper,
    putPaper,
    deletePaper
}