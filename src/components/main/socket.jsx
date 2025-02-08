import { io } from 'socket.io-client';

const socket = io('http://167.99.228.40:5000', {
  transports: ['websocket'], // Specify the transport method
  withCredentials: true // Ensure credentials are sent
});

export default socket;
