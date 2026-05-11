const fs = require('fs');
const path = require('path');
const https = require('https');

const menuFile = path.join(__dirname, 'js', 'menu-data.js');
const imgDir = path.join(__dirname, 'assets', 'images');

// Ensure image directory exists
if (!fs.existsSync(imgDir)) {
    fs.mkdirSync(imgDir, { recursive: true });
}

let content = fs.readFileSync(menuFile, 'utf8');

// Regex to find all items: { id: 1, name: '...', ... }
const itemRegex = /{[\s\S]*?id:\s*(\d+),\s*name:\s*'([^']+)'[\s\S]*?image:\s*'[^']+'\s*}/g;

const items = [];
let match;
while ((match = itemRegex.exec(content)) !== null) {
    items.push({
        fullMatch: match[0],
        id: match[1],
        name: match[2]
    });
}

console.log(`Found ${items.length} items to process.`);

// Download function
function downloadImage(url, dest) {
    return new Promise((resolve, reject) => {
        if (fs.existsSync(dest)) {
            // Skip if already exists
            resolve(true);
            return;
        }

        const file = fs.createWriteStream(dest);
        https.get(url, (response) => {
            if (response.statusCode === 301 || response.statusCode === 302) {
                // Follow redirect once (pollinations sometimes redirects to their cloudflare bucket)
                https.get(response.headers.location, (res2) => {
                    res2.pipe(file);
                    file.on('finish', () => {
                        file.close(resolve);
                    });
                }).on('error', (err) => {
                    fs.unlink(dest, () => reject(err));
                });
            } else if (response.statusCode === 200) {
                response.pipe(file);
                file.on('finish', () => {
                    file.close(resolve);
                });
            } else {
                file.close();
                fs.unlink(dest, () => resolve(false));
            }
        }).on('error', (err) => {
            fs.unlink(dest, () => reject(err));
        });
    });
}

async function processItems() {
    let successCount = 0;
    
    // Process sequentially to avoid rate limits
    for (let i = 0; i < items.length; i++) {
        const item = items[i];
        
        // Clean up the name for the prompt
        const prompt = item.name.replace(/ \(/g, ' ').replace(/\)/g, '') + ' delicious food photography';
        const url = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?width=400&height=300&nologo=true`;
        const dest = path.join(imgDir, `item-${item.id}.jpg`);
        
        console.log(`[${i+1}/${items.length}] Downloading image for: ${item.name}`);
        
        try {
            await downloadImage(url, dest);
            
            // Update the string content
            const updatedMatch = item.fullMatch.replace(/image:\s*'[^']+'/, `image: 'assets/images/item-${item.id}.jpg'`);
            content = content.replace(item.fullMatch, updatedMatch);
            successCount++;
        } catch (err) {
            console.error(`Error downloading ${item.name}: ${err.message}`);
        }
        
        // Optional: slight delay between requests
        await new Promise(r => setTimeout(r, 500));
    }
    
    // Save the updated menu-data.js
    fs.writeFileSync(menuFile, content);
    console.log(`\nDone! Successfully downloaded and updated ${successCount}/${items.length} items.`);
}

processItems();
