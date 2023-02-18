const express = require('express');
const app = express();

// GET method route
app.get("/", (req, res) => {
    res.send("GET request to the homepage")
});

// POST method route
app.post("/", (req, res) => {
    res.send("POST request to the homepage")
});

// PUT method route
app.put("/", (req, res) => {
    res.send("PUT request to the homepage")
});

// PATH method route
app.patch("/", (req, res) => {
    res.send("PATCH request to the homepage")
});

// DELETE method route
app.delete("/", (req, res) => {
    res.send("DELETE request to the homepage")
});

app.all("/secret", function (req, res, next) {
    console.log("Accessing the secret section ...")
    next() // pass control to the next handler
});

//---router string---//
app.get("/router", (req, res) => {
    res.send("đường dẫn chuỗi thông thường, sẽ khớp với route 'router'");
});

//---router string pattern---//
app.get("/router/*", (req, res) => {
    res.send("route trên khớp với mọi đường dẫn bắt đầu với 'router'");
});

//---router regular expressions---//
app.get("/.*router$/", (req, res) => {
    res.send("route này sẽ khớp với mọi đường dẫn kết thúc với đuôi là 'router'");
});

//---router parameters---//
app.get("/user/:username", function (req, res) {
    res.send(`Hello! This is ${req.params.username}`);
});

//---router handler---//
function cb0(req, res, next) {
    console.log("cb0")
    next()
}
function cb1(req, res, next) {
    console.log("cb1")
    next()
}
function cb2(req, res) {
    res.send("Hello from cb2!")
}
app.get("/router/callback", [cb0, cb1, cb2]);

//---router app.route()---//
const actPost = function (req, res, next) {
    // post something
}
const actGet = function (req, res, next) {
    // get something
}
const actPut = function (req, res, next) {
    // put something
}
app.route("/user")
    .post(actPost)
    .get(actGet)
    .put(actPut)

//---express.Router---//
const appRouter = require('./src/routes/app.router');
app.use("/app", appRouter);

app.listen(3000, () => {
    console.log('App listening on port 3000!');
});