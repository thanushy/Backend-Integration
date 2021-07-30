const express = require('express');
const request = require('request-promise');
const router = express.Router()

const api = 'https://api.hubapi.com/hubdb';

router.post('/add', async(req, res, next) => {
    try {
        const endpoint = '/api/v2/tables/5249703/rows';
        console.log(req.body.values);
        let requestBody = {
            "values": req.body.values
        }
        request({
            method: 'POST',
            url: api + endpoint,
            qs: {
                hapikey: '8546fa0c-6010-4ad0-9437-58df1a2e4437'
              },
            json: true,
            body: requestBody
        }).then(success => {
            console.log('Row Inserted');
            res.status(200).send({message: "Row Inserted"});
        }).catch(error => {
            console.log('error', error.message);
            res.status(500).send({message: "Error occured"});
        })
    } catch (error) {
        console.log("error", error);
    }
})


router.post('/addSurvey', async(req, res, next) => {
    try {
        const endpoint = '/api/v2/tables/5250161/rows';
        console.log(req.body.values);
        let requestBody = {
            "values": req.body.values
        }
        request({
            method: 'POST',
            url: api + endpoint,
            qs: {
                hapikey: '8546fa0c-6010-4ad0-9437-58df1a2e4437'
              },
            json: true,
            body: requestBody
        }).then(success => {
            console.log('Row Inserted');
            res.status(200).send({message: "Row Inserted"});
        }).catch(error => {
            console.log('error', error.message);
            res.status(500).send({message: "Error occured"});
        })
    } catch (error) {
        console.log("error", error);
    }
})


module.exports = router;