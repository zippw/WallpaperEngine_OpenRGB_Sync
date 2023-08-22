import * as express from "express";
import { RGB } from './types';
import { Server, Socket } from 'socket.io';
const app = express();
const http = require('http').createServer(app);

import { port, e131_port } from '../config.json';
const prefix = () => {
    return `[ ${new Date().toLocaleString('en')} ]`
};

const io = new Server(http, {
    cors: {
        origin: '*'
    }
});

io.on('connection', (socket: Socket) => {
    const id = socket.id;
    console.log(`${prefix()} Client ${id} connected`);

    // recieve E1.31 data
    const E131 = require('e131').Server({ port: e131_port });
    E131.on('listening', () => {
        console.log(`${prefix()} E1.31 receiver is running on port ${e131_port}`);
    });

    let c = 0;
    E131.on('packet', (packet: any) => {
        c++;
        const data = packet.getSlotsData();
        let rgb: RGB = [
            data[0],
            data[1],
            data[2]
        ];
        socket.emit('rgbData', rgb);
    });

    socket.on('disconnect', (socket) => {
        console.log(`${prefix()} Client ${id} disconnected. Sent ${c} packets.`);
        E131.close();
        console.log(`${prefix()} E1.31 receiver is turned off.`);
    });
});

http.listen(port as Number, () => {
    console.log(`${prefix()} Local server is running on port ${port}`);
});