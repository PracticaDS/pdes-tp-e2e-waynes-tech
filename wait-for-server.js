var request = require('request');
const url = process.env.CYPRESS_baseUrl + "/api"

let retries = 30;

const callApi = () => request(url, (error, response, body) => {
  if(error || response.statusCode != 200) {
    const statusCode = response? response.statusCode: 0;
    console.log("Server not available", 0, error)
    retries -= 1
    if(retries > 0){
      setTimeout(callApi, 1000);
    } else {
      process.exit(-1)
    }
  }
  else {
    console.log("Server Response OK", body);
    process.exit(0);
  }})

callApi()