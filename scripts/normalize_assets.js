const fs = require('fs');
const path = require('path');

const sourceDirs = [
    path.join(__dirname, '../public/animation1'),
    path.join(__dirname, '../public/animation2')
];
const targetDir = path.join(__dirname, '../public/frames');

if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
}

let globalIndex = 1;

sourceDirs.forEach(dir => {
    const files = fs.readdirSync(dir).sort(); // Ensure alphanumeric sort

    files.forEach(file => {
        if (file.endsWith('.webp')) {
            const sourcePath = path.join(dir, file);
            // 0001.webp, 0002.webp, etc.
            const targetName = String(globalIndex).padStart(4, '0') + '.webp';
            const targetPath = path.join(targetDir, targetName);

            fs.copyFileSync(sourcePath, targetPath);
            console.log(`Copied ${file} -> ${targetName}`);
            globalIndex++;
        }
    });
});

console.log(`Done! Total frames: ${globalIndex - 1}`);
