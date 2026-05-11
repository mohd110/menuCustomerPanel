const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, 'js', 'menu-data.js');
let content = fs.readFileSync(file, 'utf8');

// The regex matches: https://image.pollinations.ai/prompt/<prompt>?width=400&height=300&nologo=true
content = content.replace(/https:\/\/image\.pollinations\.ai\/prompt\/([^?]+)\?width=400&height=300&nologo=true/g, (match, prompt) => {
    // We will use the decoded prompt as the seed for picsum.photos
    // picsum is extremely fast as it serves static images from a CDN
    // Using a seed ensures the same image is returned for the same item every time
    const seed = encodeURIComponent(prompt.trim().replace(/%20/g, '-'));
    return `https://picsum.photos/seed/${seed}/400/300`;
});

fs.writeFileSync(file, content);
console.log('Image URLs updated to picsum.photos for faster loading.');
