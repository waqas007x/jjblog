
const http = require('http');
const fs = require('fs');
const path = require('path');

const hostname = '127.0.0.1';
const port = 80;

// Read HTML files
const home = fs.readFileSync('home.html');
const about = fs.readFileSync('search.html');
const contact = fs.readFileSync('contact.html');

// Path to the 'css' and 'img' folders
const cssFolder = 'css';
const imgFolder = 'img';

// Read CSS files
const styleCSS = fs.readFileSync(path.join(cssFolder, 'style.css'));
const utilisCSS = fs.readFileSync(path.join(cssFolder, 'utilis.css'));
const backCSS = fs.readFileSync(path.join(cssFolder, 'back.css'));
const mobileCSS = fs.readFileSync(path.join(cssFolder, 'mobile.css'));
const contactCSS = fs.readFileSync(path.join(cssFolder, 'contact.css')); // Add this line

// Create the server
const server = http.createServer((req, res) => {
    console.log(req.url);
    const url = req.url;
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');

    // Serve HTML files
    if (url === '/') {
        res.end(home);
    } else if (url === '/search') {
        res.end(about);
    } else if (url === '/contact') {
        res.end(contact);
    }
    // Serve CSS files
    else if (url === '/css/style.css') {
        res.setHeader('Content-Type', 'text/css');
        res.end(styleCSS);
    } else if (url === '/css/utilis.css') {
        res.setHeader('Content-Type', 'text/css');
        res.end(utilisCSS);
    } else if (url === '/css/back.css') {
        res.setHeader('Content-Type', 'text/css');
        res.end(backCSS);
    } else if (url === '/css/mobile.css') {
        res.setHeader('Content-Type', 'text/css');
        res.end(mobileCSS);
    } else if (url === '/css/contact.css') { // Add this block
        res.setHeader('Content-Type', 'text/css');
        res.end(contactCSS);
    }
    // Serve image files
    else if (url === '/img/ar1.jpg' || url === '/img/ar2.jpg' || url === '/img/ar3.jpg') {
        const imagePath = path.join(imgFolder, path.basename(url));
        const image = fs.readFileSync(imagePath);
        res.setHeader('Content-Type', 'image/jpeg');
        res.end(image);
    }
    // 404 Not Found for other requests
    else {
        res.statusCode = 404;
        res.end('<h1>404 Not Found</h1>');
    }
});

// Start the server
server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});

