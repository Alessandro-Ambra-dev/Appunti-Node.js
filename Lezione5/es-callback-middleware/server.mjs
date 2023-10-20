import express from "express";

const app = express();

app
  .use(function setHeaderMiddleware(request, response, next) {
    console.log("called: setHeaderMiddleware");

    response.setHeader("X-Custom-Header", "1234");

    next();
  })
  .use(function middlewareWithError(request, response, next) {
    console.log("called: middlewareWIthError");
    next(new Error("There has been an error."));
  })
  .use(function sendDataMiddleware(request, response, next) {
    console.log("called: sendDataMiddleware");

    response.json({ data: "This is some data" });

    next();
  })
  .use(function errorHandleMiddleware(error, request, response, next) {
    console.log("called: errorHandleMiddleware");

    response.status(500);

    response.json({ message: error.message });
    
    next();
  })
  .listen(3000);
