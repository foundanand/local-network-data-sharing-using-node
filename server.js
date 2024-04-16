const net = require('net');
const fs = require('fs');
const http = require('http');

const FILE_PATH = 'data_file_deeplearing.tar.gz';
// const FILE_PATH = 'readme.txt';

const server = net.createServer((socket) => {
  console.log('Client connected');

  const writeStream = fs.createWriteStream(FILE_PATH);

  socket.pipe(writeStream);
  console.log('Receving files...'); 

  // To Add code to show time taken to transfer file and time remaining and percentage of file transferred
  // To Add code to show the speed of transfer in MB/s


  socket.on('end', () => {
    console.log('File transfer complete');
    server.close();
  });

  socket.on('error', (err) => {
    console.error('Error:', err);
    server.close();
  });
}); 

const ipAddress = "192.168.0.0"; // Add your device IP address here
const port = 3000;

server.listen(port, ipAddress, () => {
    console.log(`Server Listening on http://${ipAddress}:${port}`);
});