const express = require('express')
const router = express.Router()

const ThirdApiController = require('../controllers/thirdApi-controller')

router.get('/yes-no', ThirdApiController.yesOrNo)



module.exports = router