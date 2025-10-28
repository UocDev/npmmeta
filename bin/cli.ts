#!/usr/bin/env node
// bin/cli.ts
import process from "node:process";
import { getMeta } from "../src/index.js";

const [, , pkg] = process.argv;

if (!pkg) {
  console.error("Usage: npmmeta <package>[@version]");
  process.exit(1);
}

(async () => {
  try {
    const info = await getMeta(pkg);
    console.log(`${info.name}@${info.version}`);
    console.log(`${info.description || "No description"}`);
    console.log(`Dependencies: ${info.dependenciesCount}`);
    console.log(`Maintainers: ${info.maintainers.join(", ") || "None"}`);
    console.log(`Updated: ${info.lastModified || "Unknown"}`);
    console.log(`Downloads (week): ${info.downloads.toLocaleString()}`);
  } catch (err: any) {
    console.error("Failed to fetch metadata:", err?.message ?? err);
    process.exit(2);
  }
})();
