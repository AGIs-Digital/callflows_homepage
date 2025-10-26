const fs = require('fs');
const path = require('path');
const glob = require('glob');

/**
 * Script to fix "callflows" branding consistency
 * - "Callflows" (with S) → "callflows" (brand name, always lowercase)
 * - "callflow" (without S) → only capitalize at sentence start (English term)
 */

const filesToProcess = [
  'translations/**/*.json',
  'components/**/*.{ts,tsx}',
  'app/**/*.{ts,tsx}',
  'lib/**/*.{ts,tsx}'
];

let totalReplacements = 0;

function processFile(filePath) {
  console.log(`Processing: ${filePath}`);
  
  let content = fs.readFileSync(filePath, 'utf8');
  let replacements = 0;
  
  // Replace "Callflows" (with S, brand name) → "callflows" (always lowercase)
  const beforeBrandFix = content;
  content = content.replace(/Callflows/g, 'callflows');
  const brandReplacements = (beforeBrandFix.match(/Callflows/g) || []).length;
  
  if (brandReplacements > 0) {
    replacements += brandReplacements;
    console.log(`  ✓ Fixed ${brandReplacements} brand name(s): "Callflows" → "callflows"`);
  }
  
  // Note: "Callflow" (without S) is intentionally NOT replaced
  // It's an English term that should be capitalized at sentence start
  
  if (replacements > 0) {
    fs.writeFileSync(filePath, content, 'utf8');
    totalReplacements += replacements;
  }
}

// Process all matching files
filesToProcess.forEach(pattern => {
  const files = glob.sync(pattern, { nodir: true });
  files.forEach(file => {
    try {
      processFile(file);
    } catch (error) {
      console.error(`Error processing ${file}:`, error.message);
    }
  });
});

console.log(`\n✅ Done! Total replacements: ${totalReplacements}`);
console.log(`\nSummary:`);
console.log(`  - "Callflows" (brand) → "callflows" (always lowercase)`);
console.log(`  - "Callflow" (term) → kept as-is (capitalize at sentence start only)`);

