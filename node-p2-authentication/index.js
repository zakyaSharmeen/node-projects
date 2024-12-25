


const express = require("express") // Import the Express framework
const app = express() // Create an Express application instance
const path = require("path") // Import the Path module to handle file paths
const hbs = require("hbs") // Import the Handlebars template engine
const collection = require("./src/mongodb") // Import a MongoDB collection from a local file

const tempelatePath = path.join(__dirname, "../node-p2-authentication/tempelates") // Define the path to the templates directory

app.use(express.json()) // Middleware to parse JSON request bodies
app.set("view engine", "hbs") // Set Handlebars as the template engine
app.set("views", tempelatePath) // Set the views directory to the specified template path
app.use(express.urlencoded({ extended: false })) // Middleware to parse URL-encoded request bodies

app.get("/", (req, res) => { // Handle GET request to root route
    res.render("login") // Render the "login" template
})

app.get("/signup", (req, res) => { // Handle GET request to /signup route
    res.render("signup") // Render the "signup" template
})

app.post("/signup", async (req, res) => { // Handle POST request to /signup route
    const data = { // Create a data object from request body
        name: req.body.name, // Set name from request body
        password: req.body.password // Set password from request body
    }

    await collection.insertMany([data]) // Insert the data into the MongoDB collection
    res.render("home") // Render the "home" template
})

app.post("/login", async (req, res) => { // Handle POST request to /login route

    try { 
        const check = await collection.findOne({ name: req.body.name }) // Find a user with the given name
        if (check.password === req.body.password) { // Compare passwords
            res.render("home") // Render the "home" template if the password matches
        } else {
            res.send("wrong password") // Send an error message for incorrect password
        }
    } catch {
        res.send("wrong details") // Send an error message for invalid user details
    }

})

app.listen(3000, () => { // Start the server on port 3000
    console.log("port started"); // Log a message indicating the server is running
})
