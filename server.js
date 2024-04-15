const net = require('net');
const fs = require('fs');

const PORT = 3000;
const FILE_PATH = 'data_file_deeplearing.gz';

const server = net.createServer((socket) => {
  console.log('Client connected');

  const writeStream = fs.createWriteStream(FILE_PATH);

  socket.pipe(writeStream);

  socket.on('end', () => {
    console.log('File transfer complete');
    server.close();
  });

  socket.on('error', (err) => {
    console.error('Error:', err);
    server.close();
  });
});

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
