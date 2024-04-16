const net = require('net');
const fs = require('fs');

const PORT = 3000;
const FILE_PATH = 'FliqloScr.zip';
const SERVER_IP = '192.168.0.0'; // Replace with the server's IP address

const fileStream = fs.createReadStream(FILE_PATH);

const client = new net.Socket();

client.connect(PORT, SERVER_IP, () => {
  console.log('Connected to server');

  fileStream.pipe(client);
  console.log('Sending file...');

  fileStream.on('end', () => {
    console.log('File sent');
    client.end();
  });

  fileStream.on('error', (err) => {
    console.error('Error:', err);
    client.end();
  });
});

client.on('close', () => {
  console.log('Connection closed');
});