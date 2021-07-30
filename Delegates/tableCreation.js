const request = require('request-promise');
const api = 'https://api.hubapi.com';
const endpoint = '/hubdb/api/v2/tables';

const checkTableExists = () => {
    request({
        method: 'GET',
        url: api + endpoint,
        qs: {
          hapikey: '8546fa0c-6010-4ad0-9437-58df1a2e4437'
        },
        json: true,
      }).then(response => {
        let tableExists = false;
        response['objects'].map(data => {
          if(data.name == 'AnalyticsView'){
            console.log('Table already exists');
            tableExists = true
          }
        })
        if(!tableExists){
          createTable();
        }
      })
}

const createTable = () => {
    request({
        method: 'POST',
        url: api + endpoint,
        qs: {
          hapikey: '8546fa0c-6010-4ad0-9437-58df1a2e4437'
        },
        json: true,
        body: {
            "name": 'AnalyticsView',
            "columns" : [{
                "name": "Email",
                "type": "TEXT"
            }, {
                "name": "TotalViewed",
                "type": "NUMBER"
            }, {
                "name": "PersonViewed",
                "type" : "NUMBER"
            }, {
                "name": "Date",
                "type": "TEXT"
            }, {
                "name": "DURATION OF TIME",
                "type": 'TEXT'
            }]
        }
      }).then(success => {
          console.log('successfully created');
      }).catch(error => {
          console.log('error', error);
      });
}

module.exports = checkTableExists;