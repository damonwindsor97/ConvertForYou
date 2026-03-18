import { io } from 'socket.io-client';

// CHANGE ADDRESS TO API LIVE SERVER 
export const socket = io(import.meta.env.VITE_API_ENDPOINT, {
    transports: ['websocket'],
    autoConnect: true,
    secure: true,
    upgrade: false
});