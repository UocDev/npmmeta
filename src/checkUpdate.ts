import { getMeta } from "./fetcher.js";

export interface CheckResult {
  name: string;
  current?: string;
  latest: string;
  status: "up-to-date" | "outdated" | "unknown";
}

export async function checkUpdate(pkg: string, current?: string): Promise<CheckResult> {
  try {
    const meta = await getMeta(pkg);
    const latest = meta["dist-tags"]?.latest || "unknown";
    let status: CheckResult["status"] = "unknown";

    if (current && latest !== "unknown") {
      status = current === latest ? "up-to-date" : "outdated";
    }

    return { name: pkg, current, latest, status };
  } catch {
    return { name: pkg, latest: "unknown", status: "unknown" };
  }
}
