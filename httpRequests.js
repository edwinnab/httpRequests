
/*
five ways of making http requests in Nodejs
1. using HTTP this is the standard library,
--it allows you to plug and go without the need for external dependencies
--send  a GET request to NASA API, and in return data from the server
--the http module does not support https, so we need to require it as our api requires https
 */
const https = require('https');

https.get('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY', (resp) => {
    let data = '';

    //the api gets/receives a chunk of data
    resp.on('data', (chunk) => {
        data += chunk
    });

    //receive the whole response and print out the result
    resp.on('end', () => {
       console.log(JSON.parse(data).explanation);
    });
}).on("error", (err) => {
    console.log("Error: " + err.message)
})


/*
2. Request, is a simplified http client
--we have to install it as a dependency from npm
--with request we require less code than the one used for http
 */

const request = require('request');

request('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY', {json: true}, (err, res,body) => {
    if(err) { return console.log(err);}
    console.log(body.url)
    console.log(body.explanation);
})

/*
3.Axios, is a promise based http client for the browser as well as node.js
--you need to install axios as a dependency

 */
var axios = require('axios');

axios.all([
    axios.get('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&date=2017-08-03'),
    axios.get('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&date=2017-08-02')
]).then(axios.spread((response1, response2) => {
    console.log(response1.data.url);
    console.log(response2.data.url);
})).catch(error => {
    console.log(error);
});

/*
superAgent,library for making AJAX requests in the browser but works in node.js as well
--install it as a dependency
--you can chain other methods to the request such as query() to add parameters to request
 */

const superagent = require('superagent');
superagent.get('https://api.nasa.gov/planetary/apod')
.query({api_key: 'DEMO_KEY', date: '2017-08-02'})
.end((err, res) => {
    if(err) { return console.log(err); }
    console.log(res.body.url);
    console.log(res.body.explanation);
})

/*
5. Got, works with promises
 */

const got = require('got');

got.get('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY', {json: true}).then(response => {
    console.log(response.body.url);
    console.log(response.body.explanation);
}).catch(error => {
    console.log(error.response.body);
})