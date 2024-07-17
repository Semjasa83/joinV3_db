const io = require('socket.io');

function setupSocketIO(server) {
  const socketIO = io(server, {
    cors: {
      origin: "http://localhost:4200",
    //   methods: ["GET", "POST"], 
    }
  });

  socketIO.on('connection', (socket) => {
    console.log('A user connected');
    
    socket.on('disconnect', () => {
      console.log('User disconnected');
    });

    // Beispiel für ein benutzerdefiniertes Ereignis
    socket.on('customEvent', (data) => {
      console.log('Custom Event Triggered', data);
    });

    // Fehlerbehandlung
    socket.on('error', (err) => {
      console.error('Socket Error', err);
    });
    
    // Weitere Ereignisdefinitionen hier
  });
}

module.exports = { setupSocketIO };