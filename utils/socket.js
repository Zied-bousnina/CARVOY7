import { io } from 'socket.io-client';

// "undefined" means the URL will be computed from the `window.location` object
const URL = process.env.NODE_ENV === 'production' ? 'https://convoyage.onrender.com' : 'https://convoyage.onrender.com';

export const socket = io(URL,
    {
        transports: ['websocket'],
        // autoConnect: false,
    }
    );