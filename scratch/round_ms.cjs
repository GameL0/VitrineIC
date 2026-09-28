const fs = require('fs');

const f = 'src/components/requester/MatchScreen.tsx';
let c = fs.readFileSync(f, 'utf8');

c = c.replace(/style=\{\{ border: `1px solid \$\{NAVY\}20` \}\}/g, 'style={{ border: `1px solid ${NAVY}20`, borderRadius: "16px", overflow: "hidden" }}');
c = c.replace(/className="w-16 h-16 flex items-center justify-center flex-shrink-0"/g, 'className="w-16 h-16 flex items-center justify-center flex-shrink-0 rounded-[12px]"');
c = c.replace(/style=\{\{ border: `1px solid \$\{RED\}`, background: `\$\{RED\}08` \}\}/g, 'style={{ border: `1px solid ${RED}`, background: `${RED}08`, borderRadius: "6px" }}');
c = c.replace(/border: `1px solid \$\{NAVY\}22`,\n\s*opacity: 0\.65,\n\s*\}\}/g, 'border: `1px solid ${NAVY}22`, opacity: 0.65, borderRadius: "6px" }}');
c = c.replace(/style=\{\{ background: RED, color: OFFWHITE, fontFamily: "Inter, sans-serif" \}\}/g, 'style={{ background: RED, color: OFFWHITE, fontFamily: "Inter, sans-serif", borderRadius: "10px" }}');
c = c.replace(/style=\{\{ border: `1\.5px solid \$\{RED\}`, color: RED, background: "transparent", fontFamily: "Inter, sans-serif" \}\}/g, 'style={{ border: `1.5px solid ${RED}`, color: RED, background: "transparent", fontFamily: "Inter, sans-serif", borderRadius: "10px" }}');
c = c.replace(/style=\{\{ border: `1px solid \$\{NAVY\}30`, color: NAVY, fontFamily: "Space Mono, monospace" \}\}/g, 'style={{ border: `1px solid ${NAVY}30`, color: NAVY, fontFamily: "Space Mono, monospace", borderRadius: "10px" }}');
c = c.replace(/style=\{\{ background: `\$\{NAVY\}05`, border: `1px solid \$\{NAVY\}12` \}\}/g, 'style={{ background: `${NAVY}05`, border: `1px solid ${NAVY}12`, borderRadius: "12px" }}');
c = c.replace(/style=\{\{ border: `1px dashed \$\{NAVY\}20` \}\}/g, 'style={{ border: `1px dashed ${NAVY}20`, borderRadius: "12px" }}');

fs.writeFileSync(f, c);
