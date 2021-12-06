class ResponseMethods {

    sendJson = (res, data) => {
        res.writeHead(200, {
            'Content-Type': 'application/json'
        });
        res.end(JSON.stringify(data));  
    }
}

module.exports = new ResponseMethods();