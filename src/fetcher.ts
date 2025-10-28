// src/fetcher.ts
import https from "node:https";

function fetchJSON<T = any>(url: string): Promise<T> {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = "";
      res.on("data", (chunk) => (data += chunk));
      res.on("end", () => {
        try {
          resolve(JSON.parse(data) as T);
        } catch (err) {
          reject(err);
        }
      });
      res.on("error", reject);
    }).on("error", reject);
  });
}

/**
 * Parse input like:
 * - "express"
 * - "express@4.19.2"
 * - "@scope/pkg@1.2.3"
 * Return base package name and optional version.
 */
function parsePackage(input: string): { name: string; version?: string } {
  if (!input) return { name: input };
  // If scoped package: starts with '@'
  if (input.startsWith("@")) {
    const idx = input.lastIndexOf("@");
    if (idx > 0) {
      return { name: input.slice(0, idx), version: input.slice(idx + 1) };
    }
    return { name: input };
  } else {
    const idx = input.indexOf("@");
    if (idx > 0) {
      return { name: input.slice(0, idx), version: input.slice(idx + 1) };
    }
    return { name: input };
  }
}

export async function getRegistryData(pkgInput: string) {
  const { name } = parsePackage(pkgInput);
  const encoded = encodeURIComponent(name);
  const url = `https://registry.npmjs.org/${encoded}`;
  return fetchJSON<any>(url);
}

export async function getDownloadData(pkgInput: string) {
  const { name } = parsePackage(pkgInput);
  const encoded = encodeURIComponent(name);
  // last-week endpoint
  const url = `https://api.npmjs.org/downloads/point/last-week/${encoded}`;
  return fetchJSON<any>(url);
}
