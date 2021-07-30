const express = require('express');
const request = require('request-promise');
const router = express.Router();
const jsforce = require('jsforce');
const conn = new jsforce.Connection({
    loginUrl: "https://login.salesforce.com"
});
conn.login('thanushiya.yogaraj@goaugment.io', 'Thanu@28!LXx8WhASRRdxNuzBqjnNJas9').then(success =>{
    console.log("Connected to salesforce");
}).catch(err => {
    console.log(err);
})
router.get('/getAllContacts', async(req, res, next) => {
    try {
        console.log('Get All Contacts');
        conn.query("SELECT NAME, EMAIL, PHONE, ACCOUNTID FROM Contact WHERE ACCOUNTID = '0015g00000K5uZiAAJ'", function(err, response) {
            if (err) { throw new Error(err) }
            res.status(200).send({"Contacts": response})
        });
    } catch (error) {
        console.log(error)
        res.status(200).send({"Error": err})
    }
})

router.post('/createContacts', async(req, res, next) => {
    try {
        req.body.userContact.accountId = "0015g00000K5uZiAAJ";
        console.log(req.body.userContact)
        conn.sobject("Contact").create(req.body.userContact, (err, response) => {
            console.log(err);
            console.log(response);
            if (err) { throw new Error(err) }
            res.status(200).send({"Contacts": response})
        })
    } catch (error) {
        res.status(200).send({"Error": error})
    }
})

router.post('/addSurvey',async(req, res, next) => {
    try {
        conn.sobject("Survey_Analytics__c").create(req.body.values,(err, response) => {
            if(err) {
                throw new Error(err);
            }
            res.status(200).send({ message: "Row Inserted"})
          })
    } catch (error) {
        res.status(200).send({ message: "Error occured"})
    }
})

router.post('/addDeck',async(req, res, next) => {
    try {
        conn.sobject("Deck_Analytics__c").create(req.body.values,(err, response) => {
            if(err) {
                throw new Error(err);
            }
            res.status(200).send({ message: "Row Inserted"})
          })
    } catch (error) {
        res.status(200).send({ message: "Error occured"})
    }
})

router.get('/getDeck', async(req, res, next) => {
    try {
        conn.sobject("Deck__c").select((err, response) => {
            if(err) {
                throw new Error(err);
            }
            res.status(200).send({ response: response})
        })
    } catch (error) {
        res.status(200).send({ message: "Error occured"});
    }
})

router.get('/getSurvey', async(req, res, next) => {
    try {
        conn.sobject("SurveyDeck__c").select((err, response) => {
            if(err) {
                throw new Error(err);
            }
            res.status(200).send({ response: response})
        })
    } catch (error) {
        res.status(200).send({ message: "Error occured"});
    }
})
module.exports = router;