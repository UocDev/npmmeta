#!/usr/bin/env node
// bin/cli.ts
import process from "node:process";
import { getMeta } from "../src/index.js";
import { checkUpdate } from "../src/checkUpdate.js";

const args = process.argv.slice(2);

if (args[0] === "check") {
  const pkg = args[1];
  if (!pkg) {
    console.error("Usage: npmmeta check <package>");
    process.exit(1);
  }

  const currentArgIndex = args.findIndex(a => a === "--current");
  const currentVersion = currentArgIndex !== -1 ? args[currentArgIndex + 1] : undefined;

  const result = await checkUpdate(pkg, currentVersion);
  console.log(
    `Package: ${result.name}\nCurrent: ${result.current || "(unknown)"}\nLatest: ${result.latest}\nStatus: ${
      result.status === "up-to-date" ? "Up to date" : result.status === "outdated" ? "utdated" : "Unknown"
    }`
  );
  process.exit(0);
}


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
