import React from 'react'
import socketio from "socket.io-client";
export const socket = socketio.connect('https://socket.fivvia.com/');
export const SocketContext = React.createContext();