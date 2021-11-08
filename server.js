const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const morgan = require('morgan');
const http = require('http');
const { Server } = require('socket.io');

// Api Routes Imports
const launchRoutes = require('./routes/launch');
const Launch = require('./models/lunch');

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

io.on('connection', async (socket) => {

    socket.on('message2', ({ message }) => {
        io.emit('message2', { message })
    });


    socket.on('message', async ({ message }) => {
        const updatedLaunch = await Launch.findOneAndUpdate({ _id: message._id }, { $set: { status: "processing" } }, { new: true });
        console.log(updatedLaunch);
        io.emit('message', { message })
    });

    /*** get all launch  */
    const launch = await Launch.find({});
    socket.emit('launch', { launch });


})



app.use('/api/launch', launchRoutes);
app.get('/', (req, res) => {
    res.send('Hello World');
});




const PORT = process.env.PORT || 4000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/socket-io';

expressServer.listen(PORT, () => {
    console.log(`SERVER IS RUNNING ON PORT 4000`);

    mongoose.connect(MONGO_URI);
    const db = mongoose.connection;
    db.on('connected', () => {
        console.log(`Connected to MongoDB ${db.name} at ${db.host}:${db.port}`);
    })
});
