// src/utils/socketService.ts
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
    if (!s.connected) s.connect();
    s.emit('register', userId);
};

export const disconnectSocket = () => {
    if (socket?.connected) {
        socket.disconnect();
    }
};