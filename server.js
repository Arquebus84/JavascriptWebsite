// Create a website that logs someone in
// Test: have a preset password that must be used; already encripted
// using express for creating website; allowing for api calls with http
// Using websockets, 

const express = require('express');

const http = require('http');
// const https = require('https');
const path = require('path');
const {Server} = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const HOST = '10.17.90.6';
const PORT = 3000;

// Change the view engine to ejs
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src', 'view'));

const messages = [];

// Set static files
app.use(express.static(path.join(__dirname, 'public')));

// endpoint accepts incoming HTTP GET request to the Home page
app.get('/', (req, res)=>{
    res.render('Home');
});

// endpoint for Login page
app.get('/api/password', (req, res)=>{
    res.render('Login');
})
// endpoint for Login page
app.get('/api/message', (req, res)=>{
    res.render('Message', {messages});
})

// Watch for computer connections
io.on('connection', (socket) =>{
    console.log(`A user has connected ${socket.id}`);
    // Listen for message from user
    socket.on('client_message', (data)=>{
        console.log(`Message received ${data}`);

        // Send the user's message to every connected computer on the website
        io.emit('server_message', data);
    });
    
    socket.on('disconnect', () =>{
        console.log(`A user has disconnected ${socket.id}`);
    })
});

// app.listen(PORT, HOST, ()=>{
//     console.log(`App running on http://${HOST}:${PORT}`);
// });
server.listen(PORT, HOST, ()=>{
    console.log(`App running on ws://${HOST}:${PORT}`);
});