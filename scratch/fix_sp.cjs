const fs = require('fs');

const f = 'src/components/student/SkillPicker.tsx';
let c = fs.readFileSync(f, 'utf8');

c = c.replace(/NAVY\}44/g, 'NAVY}60');
c = c.replace(/NAVY\}20/g, 'NAVY}40');
c = c.replace(/NAVY\}25/g, 'NAVY}60');
c = c.replace(/NAVY\}30/g, 'NAVY}60');
c = c.replace(/NAVY\}15/g, 'NAVY}40');
c = c.replace(/opacity: 0.4/g, 'opacity: 0.7');

fs.writeFileSync(f, c);
