import { io } from 'socket.io-client';

const URL = process.env.NEXT_PUBLIC_API_URL

export const socket = io(URL, {
    transports: ['websocket'], // Use WebSocket transport only
    // autoConnect: false,      // Uncomment to disable auto-connection
});

// Handle connection events
socket.on('connect', () => {

});

socket.on('disconnect', (reason) => {
    console.error('Disconnected:', reason);
});

socket.on('connect_error', (err) => {
    console.error('Connection error:', err.message);
});
