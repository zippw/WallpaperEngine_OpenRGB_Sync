const e131 = require('e131');
const express = require('express');
const app = express();
const http = require('http').createServer(app);
const { port, e131_port } = require('./config.json')

const prefix = () => {
    return `[ ${new Date().toLocaleString('ru')} ]`
};

const io = require('socket.io')(http, {
    cors: {
        origin: '*'
    }
});

io.on('connection', (socket) => {
    const id = socket.id;
    console.log(`${prefix()} Client ${id} connected`);

    // recieve E1.31 data
    const e131Server = new e131.Server({ port: e131_port });
    e131Server.on('listening', () => {
        console.log(`${prefix()} E1.31 receiver is running on port ${e131_port}`);
    });
    let c = 0;
    e131Server.on('packet', (packet) => {
        c++;
        const data = packet.getSlotsData();
        let rgb = [
            data[0],
            data[1],
            data[2]
        ];
        socket.emit('rgbData', rgb);
    });

    socket.on('disconnect', (socket) => {
        console.log(`${prefix()} Client ${id} disconnected. Sent ${c} packets.`);
        e131Server.close();
        console.log(`${prefix()} E1.31 receiver is turned off.`);
    });
});
http.listen(port, () => {
    console.log(`${prefix()} Local server is running on port ${port}`);
});