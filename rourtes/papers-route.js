const express = require('express')
const router = express.Router();
const PapersController = require('../controller/papers-controller')
const auth = require("../middelwares/auth")

// اگر بخوای برای همه میدلور ها اجرا بشه
// router.use(auth)
// برای ایونایی که زیرش هست اجبار اجرای توکن میده 

router.get('/', auth, PapersController.getPapers);

router.get('/:id/:id2', PapersController.getPaperSort);

router.get('/:id', PapersController.getPaper);

router.post('/', auth, PapersController.postPaper);

router.put('/:id', PapersController.putPaper);

router.delete('/:id', PapersController.deletePaper);

module.exports = router