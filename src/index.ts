// src/index.ts
import { getRegistryData, getDownloadData } from "./fetcher.js";

export interface PackageMeta {
  name: string;
  version: string;
  description?: string;
  dependenciesCount: number;
  maintainers: string[];
  lastModified?: string;
  downloads: number;
}

/**
 * getMeta("express") or getMeta("@scope/pkg@1.2.3")
 */
export async function getMeta(pkg: string): Promise<PackageMeta> {
  const data = await getRegistryData(pkg);
  const downloadsResp = await getDownloadData(pkg).catch(() => ({ downloads: 0 }));

  const latestVersion: string | undefined = data["dist-tags"]?.latest;
  const versionInfo = (data.versions && latestVersion && data.versions[latestVersion]) || {};

  const depsObj = versionInfo.dependencies || {};
  const dependenciesCount = Object.keys(depsObj).length;

  const maintainers = Array.isArray(data.maintainers)
    ? data.maintainers.map((m: any) => (m && m.name) || String(m))
    : [];

  return {
    name: data.name,
    version: latestVersion || "unknown",
    description: data.description,
    dependenciesCount,
    maintainers,
    lastModified: data.time?.modified,
    downloads: downloadsResp?.downloads || 0
  };
}
