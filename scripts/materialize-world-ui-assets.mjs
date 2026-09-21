import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";

const root = process.cwd();
const source = join(root, "public/portfolio-world/ui/cream-gold-frame.b64.txt");
const target = join(root, "public/portfolio-world/ui/cream-gold-frame.png");

const encoded = (await readFile(source, "utf8")).trim();
if (!encoded) throw new Error("The living-world frame asset payload is empty.");

await mkdir(dirname(target), { recursive: true });
await writeFile(target, Buffer.from(encoded, "base64"));
console.log("Materialized public/portfolio-world/ui/cream-gold-frame.png");
