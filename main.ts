// Writes the poem in entry.txt to /output/entry.txt (MAKEFUN_OUTPUT_DIR stands in outside a container).
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
const poem = readFileSync(join(dirname(fileURLToPath(import.meta.url)), 'entry.txt'), 'utf8').replace(/\r\n/g, '\n').trimEnd();
const n = [...poem].length;
if (n < 1 || n > 280 || !poem.trim()) throw new Error(`poem is ${n} code points; the gate wants 1..280`);
mkdirSync(outDir, { recursive: true });
const outFile = join(outDir, 'entry.txt');
writeFileSync(outFile, poem, 'utf8');
// Read back: the gate judges the bytes on disk, so check those, not the string.
if (readFileSync(outFile, 'utf8') !== poem) throw new Error(`${outFile} did not round-trip`);
