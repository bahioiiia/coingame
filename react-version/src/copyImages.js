const fs = require('fs');
const path = require('path');

// Create public/img directory if it doesn't exist
const imgDir = path.join(__dirname, '../public/img');
if (!fs.existsSync(imgDir)) {
    fs.mkdirSync(imgDir, { recursive: true });
}

// Copy images from original project
const originalImgDir = path.join(__dirname, '../../img');
if (fs.existsSync(originalImgDir)) {
    const files = fs.readdirSync(originalImgDir);
    files.forEach(file => {
        fs.copyFileSync(
            path.join(originalImgDir, file),
            path.join(imgDir, file)
        );
    });
} 