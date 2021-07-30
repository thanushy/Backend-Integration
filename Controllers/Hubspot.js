const express = require('express');
const request = require('request-promise');
const router = express.Router();
const api = 'https://api.hubapi.com';
router.get('/getAllContacts', async(req, res, next) => {
    try {
        console.log('Get All Contacts');
        const endpoint = '/contacts/v1/lists/all/contacts/all';
        const contact = await request({
          method: 'GET',
          url: api + endpoint,
          qs: {
            hapikey: '8546fa0c-6010-4ad0-9437-58df1a2e4437',
            count: 100
          },
          json: true
        });
        let userContact=[];
        [...contact.contacts].map(data => {
            userContact.push(data.properties);
            console.log("usercontact",userContact);
        })
        res.status(200).send({"Contacts": userContact});
      } catch (error) {
        console.log('error ', error);
      }
})

router.post('/createContacts', async(req, res, next) => {
    try {
        console.log('Create New Contact');
        const endpoint = '/contacts/v1/contact';
        const createcontact = await request({
          method: 'POST',
          url: api + endpoint,
          qs: {
            hapikey: '8546fa0c-6010-4ad0-9437-58df1a2e4437'
          },
          body: req.body.userContact,
          json: true
        });
        res.status(200).send({"Contacts": createcontact});
      } catch (error) {
        console.log('error ', error);
      }
})

router.get('/checkContacts/:id', async(req, res, next) => {
  try {
    console.log(req.params.id);
    const endpoint = '/contacts/v1/contact/email/';
    console.log(api + endpoint + req.params.id + '/profile')
    const getContacts = await request({
      method: 'GET',
      url: api + endpoint + req.params.id + '/profile',
      qs: {
        hapikey: '8546fa0c-6010-4ad0-9437-58df1a2e4437'
      },
      json: true
    });
    console.log(getContacts);
    res.status(200).send({message: getContacts});
  } catch (error) {
    res.status(200).send({message: "failure"});
  }
})
module.exports = router;



