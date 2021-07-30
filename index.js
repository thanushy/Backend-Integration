const express = require('express');
const errorHandling = require('./Utils/errorHandling');
const app = express();
const headerConfig = require('./Utils/headerConfig');
const hubspot = require('./Controllers/Hubspot');
const hubspotTable = require('./Controllers/HubspotTable');
const salsforce = require('./Controllers/SalesForce');
const request = require('request-promise');
require('./Delegates/tableCreation')();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(headerConfig);
app.use('/api/hubspot', hubspot);
app.use('/api/hubspot/table', hubspotTable);
app.use('/api/salesforce', salsforce);
app.use(errorHandling);


const port = 3003;
app.listen(port, () => {
  console.log('server listening at ' + port);
});

