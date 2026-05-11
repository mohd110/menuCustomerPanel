const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, 'js', 'menu-data.js');
let content = fs.readFileSync(file, 'utf8');

// The regex matches: https://loremflickr.com/400/300/<keywords>
content = content.replace(/https:\/\/loremflickr\.com\/400\/300\/([^&']+)/g, (match, keywords) => {
    // Replace commas with spaces for the prompt
    const prompt = keywords.replace(/,/g, ' ') + ' food photography';
    // Use pollinations.ai for AI generated images on the fly
    return `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?width=400&height=300&nologo=true`;
});

fs.writeFileSync(file, content);
console.log('Image URLs updated to pollinations.ai');
