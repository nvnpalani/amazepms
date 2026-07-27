const fs = require('fs');
const path = require('path');

const targetDir = path.join(__dirname, 'src', 'app');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    const dirPath = path.join(dir, f);
    const isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(dirPath);
  });
}

walkDir(targetDir, (filePath) => {
  if (filePath.endsWith('.css')) {
    let content = fs.readFileSync(filePath, 'utf8');
    let changed = false;
    
    // Replace hardcoded text colors with variables
    if (content.includes('color: #111827')) {
      content = content.replace(/color: #111827/g, 'color: var(--text-main)');
      changed = true;
    }
    if (content.includes('color: #4b5563')) {
      content = content.replace(/color: #4b5563/g, 'color: var(--text-muted)');
      changed = true;
    }
    
    // Replace hardcoded background colors
    if (content.includes('background-color: #ffffff') && !filePath.includes('header.component.css')) {
      content = content.replace(/background-color: #ffffff/g, 'background-color: var(--bg-card)');
      changed = true;
    }
    if (content.includes('background: #fff')) {
      content = content.replace(/background: #fff/g, 'background: var(--bg-card)');
      changed = true;
    }
    if (content.includes('background-color: #f8faff')) {
      content = content.replace(/background-color: #f8faff/g, 'background-color: var(--bg-secondary)');
      changed = true;
    }
    
    if (changed) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log('Updated ' + filePath);
    }
  }
});
console.log('Done replacing structural colors');
