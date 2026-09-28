const fs = require('fs');

const f = 'src/components/student/SkillPicker.tsx';
let c = fs.readFileSync(f, 'utf8');

// Campo de tokens
c = c.replace(/minHeight: "48px" \}\}/, 'minHeight: "48px", borderRadius: "8px" }}');

// Tokens internos
c = c.replace(/color: NAVY,\s*\}\}/, 'color: NAVY, borderRadius: "6px" }}');

// Níveis (container)
c = c.replace(/border: `1px solid \$\{NAVY\}40` \}\}/, 'border: `1px solid ${NAVY}40`, borderRadius: "8px", overflow: "hidden" }}');

// Sugestoes da busca
c = c.replace(/border: `1px solid \$\{NAVY\}60`, borderTop: "none" \}\}/, 'border: `1px solid ${NAVY}60`, borderTop: "none", borderRadius: "0 0 8px 8px", overflow: "hidden" }}');

// Atalhos pelo curso (botões)
c = c.replace(/color: NAVY, opacity: 0\.7 \}\}/, 'color: NAVY, opacity: 0.7, borderRadius: "6px" }}');

// Catálogo completo (botões)
c = c.replace(/color: NAVY,\s*opacity: 0\.6,\s*\}\}/, 'color: NAVY, opacity: 0.6, borderRadius: "6px" }}');

fs.writeFileSync(f, c);
