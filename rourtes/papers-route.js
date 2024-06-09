const express = require('express')
const router = express.Router();
const PapersController = require('../controller/papers-controller')

// For Papers
router.get('/', PapersController.getPapers);

// Access to any newspaper
// app.get('/api/papers/:id', (req, res)=>{
//     res.send(req.params.id)
// })

// Access to two newspapers
// app.get('/api/papers/:id/:id2?', (req, res)=>{
//     res.send([req.params.id, req.params.id2])
// })

// /api/papers/3/4?sort=id
router.get('/:id/:id2', PapersController.getPaperSort);

router.get('/:id', PapersController.getPaper);

router.post('/', PapersController.postPaper);

router.put('/:id', PapersController.putPaper);

router.delete('/:id', PapersController.deletePaper);

module.exports = router