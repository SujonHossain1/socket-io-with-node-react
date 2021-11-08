const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const morgan = require('morgan');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const expressServer = http.createServer(app);


const middleware = [
    morgan('dev'),
    cors(),
    express.json(),
    express.urlencoded({ extended: true })
];
app.use(middleware);

const io = new Server(expressServer, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});

global.io = io;

// Api Routes Imports
const launchRoutes = require('./routes/launch');
const Launch = require('./models/lunch');

app.use('/api/launch', launchRoutes);

app.get('/', (req, res) => {
    res.send('Hello World');
});

io.on('connection', async (socket) => {
    console.log('New user connected');

    socket.on('msg', (data) => {
        socket.emit('reply', data);
    })

});



const PORT = process.env.PORT || 4000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/socket-io';
const NODE_ENV = process.env.NODE_ENV || 'development';

const server = expressServer.listen(PORT, () => {
    const port = server.address().port;
    console.log(`SERVER IS RUNNING ON PORT ${port} AND SERVER ON MODE ${NODE_ENV}`);

    if (process.env.NODE_ENV === 'production') {
        console.log('Please connect live mongodb url');
    } else {
        mongoose.connect(MONGO_URI)
        const db = mongoose.connection;
        db.on('connected', () => {
            console.log(`Connected to MongoDB ${db.name} at ${db.host}:${db.port}`);
        })
    }
});
