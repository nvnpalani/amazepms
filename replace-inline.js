const fs = require('fs');
const path = require('path');

const targetFile = path.join(__dirname, 'src', 'app', 'pages', 'home', 'home.component.html');

let content = fs.readFileSync(targetFile, 'utf8');
content = content.replace(/color:\s*#111827/g, 'color: var(--text-main)');
content = content.replace(/color:\s*#4b5563/g, 'color: var(--text-muted)');
content = content.replace(/color:\s*#1a4cd2/g, 'color: var(--primary-color)');
content = content.replace(/background-color:\s*#1a4cd2/g, 'background-color: var(--primary-color)');
content = content.replace(/background-color:\s*#ffffff/g, 'background-color: var(--bg-card)');
content = content.replace(/border:\s*(\d+px)\s*solid\s*#1a4cd2/g, 'border: $1 solid var(--primary-color)');

fs.writeFileSync(targetFile, content, 'utf8');
console.log('Updated inline styles in home.component.html');
