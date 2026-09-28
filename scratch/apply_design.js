const fs = require('fs');
const path = require('path');

const DIR = path.join(__dirname, '../src/components');

function replaceInFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;

  // Replace `borderRadius: 0` with `borderRadius: "8px"` (Inputs/Selects)
  content = content.replace(/borderRadius:\s*0/g, 'borderRadius: "8px"');

  // Any tag/pill small button or span that looks like a tag
  // We can't easily regex this without complex parsing, but let's try some heuristics:
  
  // Replace buttons missing borderRadius with 10px
  // A bit complex. Let's do something simpler:
  // We will just inject CSS in index.css! It's way more robust!
}
