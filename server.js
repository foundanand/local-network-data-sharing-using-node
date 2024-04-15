const net = require('net');
const fs = require('fs');
const http = require('http');

const FILE_PATH = '/Users/anand/local-network-data-sharing-using-node/data_file_deeplearing.zip';

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

const ipAddress = "192.168.31.211";
const port = 3000;

server.listen(port, ipAddress, () => {
    console.log(`Server Listening on http://${ipAddress}:${port}`);
});