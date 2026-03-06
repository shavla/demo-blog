import { io, Socket } from 'socket.io-client';
import { BASE_URL } from './consts';

let socket: Socket | null = null;

export const getSocket = (): Socket => {
    if (!socket) {
        socket = io(BASE_URL, { autoConnect: false });
    }
    return socket;
};

export const connectSocket = (userId: number) => {
    const s = getSocket();

    s.off('connect'); 

    s.on('connect', () => {
        s.emit('register', userId); 
    });

    if (!s.connected) {
        s.connect();
    } else {
        s.emit('register', userId);
    }
};

export const disconnectSocket = () => {
    if (socket?.connected) {
        socket.disconnect();
    }
};