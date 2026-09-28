const fs = require('fs');

const f = 'src/components/requester/NewDemandWizard.tsx';
let c = fs.readFileSync(f, 'utf8');

c = c.replace(/style=\{\{ border: `1px solid \$\{NAVY\}18`, background: `\$\{NAVY\}03` \}\}/g, 'style={{ border: `1px solid ${NAVY}18`, background: `${NAVY}03`, borderRadius: "12px" }}');
c = c.replace(/<div style=\{\{ border: `1px solid \$\{NAVY\}18` \}\}>/g, '<div style={{ border: `1px solid ${NAVY}18`, borderRadius: "12px", overflow: "hidden" }}>');
c = c.replace(/style=\{\{ background: NAVY, color: OFFWHITE, fontFamily: "Inter, sans-serif" \}\}/g, 'style={{ background: NAVY, color: OFFWHITE, fontFamily: "Inter, sans-serif", borderRadius: "10px" }}');

fs.writeFileSync(f, c);
