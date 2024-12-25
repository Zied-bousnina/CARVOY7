// import { io } from 'socket.io-client';

// // "undefined" means the URL will be computed from the `window.location` object
// const URL = process.env.NODE_ENV === 'production' ? 'https://convoyage.onrender.com' : 'https://convoyage.onrender.com';

// export const socket = io(URL,
//     {
//         transports: ['websocket'],
//         // autoConnect: false,
//     }
//     );



import { io } from 'socket.io-client';

// Determine the URL dynamically based on the environment
const URL = process.env.NODE_ENV === 'production'
    ? 'https://convoyage.onrender.com'  // Production URL
    : 'https://convoyage.onrender.com';          // Development URL

export const socket = io(URL, {
    transports: ['websocket'], // Use WebSocket transport only
    // autoConnect: false,      // Uncomment to disable auto-connection
});

// Handle connection events
socket.on('connect', () => {
    console.log('Connected to server:', socket.id);
});

socket.on('disconnect', (reason) => {
    console.error('Disconnected:', reason);
});

socket.on('connect_error', (err) => {
    console.error('Connection error:', err.message);
});
