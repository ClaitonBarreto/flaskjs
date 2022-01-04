class ResponseMethods {

    sendJson = (res, data) => {
        const statusCode = res.statusCode || 200;
        res.writeHead(statusCode, {
            'Content-Type': 'application/json'
        })
        .end(JSON.stringify(data));  
    }

    setStatusCode = (res, statusCode) => {
        res.writeHead(statusCode)
        return res
    }
}

module.exports = new ResponseMethods();