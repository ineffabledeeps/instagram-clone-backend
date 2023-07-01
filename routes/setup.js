var express = require('express');
var router = express.Router();
const {initializeDatabaseModel,modifyDatabaseModel} = require('../models/setup')

router.get('/init', async function(req,res){
    let result = await initializeDatabaseModel();
    res.json(result);
})

router.get('/modify', async function(req,res){
    let result = await modifyDatabaseModel();
    res.json(result);
})

module.exports  = router;