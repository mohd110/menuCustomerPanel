const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, 'js', 'menu-data.js');
let content = fs.readFileSync(file, 'utf8');

// The regex matches from "name: 'Item Name'" to "image: '...'"
content = content.replace(/name:\s*'([^']+)'([\s\S]*?)image:\s*'[^']+'/g, (match, name, middle) => {
    // Encode the name for the URL
    // We replace spaces with %20 and handle other characters
    // Using placehold.co with the theme's dark green (0A130E) and gold (D9B46E)
    // We add \n (newline) to make it fit nicely if it's long, or just let placehold.co handle it
    const cleanName = name.replace(/ \(/g, '\n('); // Put sizes on a new line
    const encodedName = encodeURIComponent(cleanName);
    
    return `name: '${name}'${middle}image: 'https://placehold.co/400x300/0A130E/D9B46E?text=${encodedName}'`;
});

fs.writeFileSync(file, content);
console.log('Image URLs updated to placehold.co text placeholders.');
