const respond = (request, response, status, content, type) => {
  response.writeHead(status, { 'Content-Type': type });
  response.write(content);
  response.end();
};

// Set up response
// Can be used to initially set up response for all status codes
const setupResponse = (obj, type) => {
  // If xml
  if (type === 'text/xml') {
    let xmlResponse = '<response>';
    xmlResponse = `${xmlResponse} <id>${obj.id}</id>`;
    xmlResponse = `${xmlResponse} <message>${obj.message}</message>`;
    xmlResponse = `${xmlResponse} </response>`;

    return xmlResponse;
  }

  // if json
  const jsonResponse = JSON.stringify(obj);

  return jsonResponse;
};

// 200 Success
const success = (request, response, acceptedTypes) => {
  const responseObj = {
    message: 'This is a successful response',
    id: 'Success',
  };

  const content = setupResponse(responseObj, acceptedTypes[0]);

  return respond(request, response, 200, content, acceptedTypes[0]);
};

// 400 Bad Request
const badRequest = (request, response, acceptedTypes, params) => {
  const responseObj = {
    message: 'This request has the required parameters',
    // id: 'Success'
  };

  // If not valid
  if (!params.valid || params.valid !== 'true') {
    responseObj.message = 'Missing valid query parameter set to true';
    responseObj.id = 'Bad Request';

    const content = setupResponse(responseObj, acceptedTypes[0]);

    return respond(request, response, 400, content, acceptedTypes[0]);
  }

  // If valid
  const content = setupResponse(responseObj, acceptedTypes[0]);

  return respond(request, response, 200, content, acceptedTypes[0]);
};

// 401 Unauthorized
const unauthorized = (request, response, acceptedTypes, params) => {
  const responseObj = {
    message: 'You have successfully viewed the content',
    // id: 'Unauthorized',
  };

  // If not logged in
  if (!params.loggedIn || params.loggedIn !== 'yes') {
    responseObj.message = 'Missing loggedIn query parameter set to yes';
    responseObj.id = 'Unauthorized';

    const content = setupResponse(responseObj, acceptedTypes[0]);

    return respond(request, response, 401, content, acceptedTypes[0]);
  }

  // If logged in
  const content = setupResponse(responseObj, acceptedTypes[0]);

  return respond(request, response, 200, content, acceptedTypes[0]);
};

// 403 Forbidden
const forbidden = (request, response, acceptedTypes) => {
  const responseObj = {
    message: 'You do not have access to this content',
    id: 'Forbidden',
  };

  const content = setupResponse(responseObj, acceptedTypes[0]);

  return respond(request, response, 403, content, acceptedTypes[0]);
};

// 500 Internal
const internal = (request, response, acceptedTypes) => {
  const responseObj = {
    message: 'Internal Server Error. Something went wrong.',
    id: 'Internal Server Error',
  };

  const content = setupResponse(responseObj, acceptedTypes[0]);

  return respond(request, response, 500, content, acceptedTypes[0]);
};

// 501 Not Implemented
const notImplemented = (request, response, acceptedTypes) => {
  const responseObj = {
    message: 'A get request for this page has not been implemented yet. Check again later for updated content.',
    id: 'Not Implemented',
  };

  const content = setupResponse(responseObj, acceptedTypes[0]);

  return respond(request, response, 501, content, acceptedTypes[0]);
};

// 404 Not Found
const notFound = (request, response, acceptedTypes) => {
  const responseObj = {
    message: 'The page you are looking for was not found.',
    id: 'Resource Not Found',
  };

  const content = setupResponse(responseObj, acceptedTypes[0]);

  return respond(request, response, 404, content, acceptedTypes[0]);
};

module.exports.success = success;
module.exports.badRequest = badRequest;
module.exports.unauthorized = unauthorized;
module.exports.forbidden = forbidden;
module.exports.internal = internal;
module.exports.notImplemented = notImplemented;
module.exports.notFound = notFound;
