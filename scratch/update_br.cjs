const fs = require('fs');
const path = require('path');

function replaceRecursively(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      replaceRecursively(fullPath);
    } else if (fullPath.endsWith('.tsx')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let changed = false;

      // Inputs / Selects
      if (content.includes('borderRadius: 0')) {
        content = content.replace(/borderRadius:\s*0/g, 'borderRadius: "8px"');
        changed = true;
      }

      if (changed) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`Updated ${fullPath}`);
      }
    }
  }
}

replaceRecursively(path.join(__dirname, '../src/components'));
