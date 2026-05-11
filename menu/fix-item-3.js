const fs = require('fs');
const path = require('path');
const https = require('https');

const dest = path.join(__dirname, 'assets', 'images', 'item-3.jpg');
const prompt = 'Hot Americano Black delicious food photography';
const url = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?width=400&height=300&nologo=true`;

// Delete the 0-byte file if it exists
if (fs.existsSync(dest)) {
    fs.unlinkSync(dest);
}

const file = fs.createWriteStream(dest);

console.log('Downloading Hot Americano Black image...');

https.get(url, (response) => {
    if (response.statusCode === 301 || response.statusCode === 302) {
        https.get(response.headers.location, (res2) => {
            res2.pipe(file);
            file.on('finish', () => {
                file.close();
                console.log('Download complete.');
            });
        }).on('error', (err) => {
            console.error('Error:', err);
        });
    } else if (response.statusCode === 200) {
        response.pipe(file);
        file.on('finish', () => {
            file.close();
            console.log('Download complete.');
        });
    } else {
        console.error('Status Code:', response.statusCode);
    }
}).on('error', (err) => {
    console.error('Request Error:', err);
});
