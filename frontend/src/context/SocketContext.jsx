
import React, { createContext, useEffect } from 'react';
import { io } from 'socket.io-client';

// Exposes a shared socket instance to all pages that need live ride updates.
export const SocketContext = createContext();

// Create the socket once at module load so every component shares the same connection.
const socket = io(`${import.meta.env.VITE_BASE_URL}`);

const SocketProvider = ({ children }) => {
    useEffect(() => {
        // Keep connection lifecycle logging for debugging during real-time ride events.
        socket.on('connect', () => {
            console.log('Connected to server');
        });

        socket.on('disconnect', () => {
            console.log('Disconnected from server');
        });

    }, []);

    return (
        <SocketContext.Provider value={{ socket }}>
            {children}
        </SocketContext.Provider>
    );
};

export default SocketProvider;