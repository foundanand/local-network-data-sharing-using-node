// const http = require('http');
// const fs = require('fs');
// const path = require('path');
// const app = require('./app');

// const server = http.createServer((req, res) => {
//     const filePath = path.join(__dirname, req.url);
//     const fileStream = fs.createReadStream(filePath);

//     fileStream.on('error', (err) => {
//         if (err.code === 'ENOENT') {
//             res.statusCode = 404;
//             res.end('File not found');
//         } else {
//             res.statusCode = 500;
//             res.end('Internal server error');
//         }
//     });

//     fileStream.pipe(res);
// });

// const ipAddress = "192.168.31.211"
// const port = 3000;

// // app.get('/', (req, res)=>{
// //     res.send("File Transfer in local network");
// // });

// server.listen(port, ipAddress, () => {
//   console.log(`Server Listening on http://${ipAddress}:${port}`);
// });

// // Ip Address on mac
// // ipconfig getifaddr en0

const http = require('http');
const fs = require('fs');
const path = require('path');
const formidable = require('formidable');

const server = http.createServer((req, res) => {
    if (req.method === 'POST' && req.url === '/') {
        const form = new formidable.IncomingForm();

        form.parse(req, (err, fields, files) => {
            console.log(files); // Add this line to inspect the files object
            if (err) {
                res.statusCode = 500;
                res.end('Internal Server Error');
                return;
            }

            // Check if a file was uploaded
            if (!files.file || !files.file.name) {
                res.statusCode = 400;
                res.end('No file uploaded');
                return;
            }

            // Get the temporary path of the uploaded file
            const tempPath = files.file.path;

            // Get the original file extension
            const originalExtension = path.extname(files.file.name);

            // Construct the destination path with the original file extension
            const destinationPath = path.join(__dirname, 'uploaded_files', `uploaded_file${originalExtension}`);

            // Move the uploaded file to the destination directory with the original file extension
            fs.rename(tempPath, destinationPath, (err) => {
                if (err) {
                    console.error('Error moving file:', err);
                    res.statusCode = 500;
                    res.end('Internal Server Error');
                    return;
                }
            
                res.statusCode = 200;
                res.end('File uploaded successfully');
            });
            
        });
    } else {
        res.statusCode = 404;
        res.end('Not found');
    }
});

const ipAddress = "192.168.31.211";
const port = 3000;

server.listen(port, ipAddress, () => {
    console.log(`Server Listening on http://${ipAddress}:${port}`);
});
